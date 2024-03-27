from fastapi import HTTPException, APIRouter

from apscheduler.schedulers.background import BackgroundScheduler

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models.member import Member
from models.news import News
from models.keyword import Keyword
from models.news_keyword_mapping import NewsKeywordMapping
from models.news_keyword_history import NewsKeywordHistory
from models.news_shadowing import NewsShadowing
from models.news_image import NewsImage

from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime, timedelta
from collections import Counter

import numpy as np
import pandas as pd
import pytz

router = APIRouter()

class DataStorage:
    def __init__(self, database_url="mysql+pymysql://ssafy:ssafy@j10c107.p.ssafy.io/talkydoki"):
        self.engine = create_engine(database_url)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()
        self.load_data()

    def load_data(self):
        kst = pytz.timezone('Asia/Seoul')
        now_kst = datetime.now(kst)
        five_days_ago_kst = now_kst - timedelta(days=5)
        
        # 한국 시간 기준 3일 이내의 뉴스 데이터만 쿼리
        articles = self.session.query(News).filter(News.write_date >= five_days_ago_kst).all()
        
        # articles = self.session.query(News).all()
        users = self.session.query(Member).all()
        keywords = self.session.query(Keyword).all()
        # mappings = self.session.query(NewsKeywordMapping).all()
        mappings = self.session.query(NewsKeywordMapping).join(NewsKeywordMapping.news).filter(News.write_date >= five_days_ago_kst).all()
        histories = self.session.query(NewsKeywordHistory).all()

        categories = ['SOCIETY', 'BUSINESS', 'POLITICS', 'SCIENCE_CULTURE', 'INTERNATIONAL', 'SPORTS', 'LIFE', 'WEATHER_DISASTER']
        category_kr = ['사회', '경제', '정치', '과학', '국제', '스포츠', '생활', '재난/날씨']
        category_map = dict(zip(categories, category_kr))
        self.categories = categories

        self.users = [user.id for user in users]
        self.articles = [f"{category_map[article.category]}기사{article.id}" for article in articles]
        self.words = {keyword.id: {'word': keyword.japanese, 'categories': []} for keyword in keywords}

        for mapping in mappings:
            if mapping.keyword.id in self.words:
                news_category = category_map[mapping.news.category]
                if news_category not in self.words[mapping.keyword.id]['categories']:
                    self.words[mapping.keyword.id]['categories'].append(news_category)

        article_word_data = {}
        for mapping in mappings:
            article_key = f"{category_map[mapping.news.category]}기사{mapping.news.id}"
            word_id = mapping.keyword.id
            if article_key in article_word_data:
                article_word_data[article_key][word_id] = mapping.weight
            else:
                article_word_data[article_key] = {word_id: mapping.weight}

        self.article_word_df = pd.DataFrame(0, index=self.articles, columns=self.words.keys())
        self.user_word_df = pd.DataFrame(0, index=self.users, columns=self.words.keys())

        for article, word_ids in article_word_data.items():
            for word_id, weight in word_ids.items():
                if word_id in self.article_word_df.columns:
                    self.article_word_df.at[article, word_id] = weight

        individual_preferences = {
            1: '사회',
            2: '경제',
            3: '정치',
            4: '과학',
            5: '국제',
            6: '스포츠'
        }
        
        for user in self.users:
            if user in individual_preferences:
                preferred_category = individual_preferences[user]
            else:
                # 나머지 유저들에 대한 선호 카테고리 설정
                preferred_category_index = (user - len(individual_preferences) - 1) % len(self.categories)
                preferred_category = self.categories[preferred_category_index]
                preferred_category = category_map[preferred_category]
            
            # 선호하는 카테고리의 키워드 ID와 비선호 카테고리의 키워드 ID를 분류
            preferred_words = [word_id for word_id, info in self.words.items() if preferred_category in info['categories']]
            non_preferred_words = [word_id for word_id, info in self.words.items() if preferred_category not in info['categories']]

            # 선호 단어 중 일부는 학습되지 않도록 설정
            num_to_exclude = int(len(preferred_words) * 0.15)
            excluded_words = np.random.choice(preferred_words, size=num_to_exclude, replace=False)

            # 선호하는 카테고리의 키워드에 대한 학습 횟수 설정
            for word_id in preferred_words:
                if word_id not in excluded_words:
                    self.user_word_df.at[user, word_id] = np.random.randint(5, 11)  # 높은 학습
                else:
                    self.user_word_df.at[user, word_id] = 0

            for word_id in non_preferred_words:
                count = np.random.randint(0, 5)  # 비선호 단어에 대해 낮은 학습 횟수
                self.user_word_df.at[user, word_id] = count
        
        for history in histories:
            member_id = history.member_id
            keyword_id = history.keyword_id
            read_count = history.read_count

            if member_id in self.user_word_df.index and keyword_id in self.user_word_df.columns:
                self.user_word_df.at[member_id, keyword_id] += read_count

        self.user_word_df_norm = (self.user_word_df - self.user_word_df.min()) / (self.user_word_df.max() - self.user_word_df.min())
        self.article_word_df_norm = (self.article_word_df - self.article_word_df.min()) / (self.article_word_df.max() - self.article_word_df.min())

        self.cosine_sim = cosine_similarity(self.user_word_df_norm.fillna(0), self.article_word_df_norm.fillna(0))
        self.cosine_sim_df = pd.DataFrame(self.cosine_sim, columns=self.articles, index=self.users)
        
    def get_most_recommended_articles(self, num_recommendations=3):
        all_recommendations = self.cosine_sim_df.apply(lambda row: row.sort_values(ascending=False).index.values.tolist()[:num_recommendations], axis=1).explode()
        most_common_recommendations = Counter(all_recommendations).most_common(num_recommendations)
        recommendations = [rec[0] for rec in most_common_recommendations]
        return recommendations

data_storage = DataStorage()

scheduler = BackgroundScheduler()

scheduler.add_job(data_storage.load_data, 'interval', minutes=10)

scheduler.start()

def get_news_data(news_id):
    news = data_storage.session.query(News).filter(News.id == news_id).first()
    if news:
        images_urls = [image.image_url for image in news.news_images]
        keyword_list = [keyword.keyword.japanese for keyword in news.news_keyword_mappings]
        return {
            "id": news.id,
            "title": news.title,
            "titleTranslated": news.title_translated,
            "category": news.category,
            "content": news.content,
            "contentTranslated": news.content_translated,
            "summary": news.summary,
            "summaryTranslated" : news.summary_translated,
            "write_date": news.write_date.isoformat(),
            "srcOrigin": news.src_origin,
            "newsImages": images_urls,
            "newsKeywords": keyword_list
        }
    else:
        return None

@router.get("/recommend/news/{member_id}")
async def news_recommend(member_id: int):
    shadowed_news_ids = data_storage.session.query(NewsShadowing.news_id).filter(NewsShadowing.member_id == member_id).all()
    shadowed_news_ids = [news_id[0] for news_id in shadowed_news_ids] 
    
    if member_id not in data_storage.users:
        recommendations_id = data_storage.get_most_recommended_articles()
    else:
        user_data = data_storage.cosine_sim_df.loc[member_id].sort_values(ascending=False)
        recommendations_id = []
        for news_id_str in user_data.index.values.tolist():
            news_id = int(news_id_str.split('기사')[-1])
            if news_id not in shadowed_news_ids:
                recommendations_id.append(news_id_str)
                if len(recommendations_id) == 3:
                    break

    recommendations = [get_news_data(int(news_id.split('기사')[-1])) for news_id in recommendations_id]

    return {
        "memberId": member_id, 
        "recommendations": recommendations
    }
