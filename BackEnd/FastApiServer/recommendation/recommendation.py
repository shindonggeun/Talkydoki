from fastapi import HTTPException, APIRouter
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from models.member import Member
from models.news import News
from models.keyword import Keyword
from models.news_keyword_mapping import NewsKeywordMapping
from models.news_keyword_history import NewsKeywordHistory
from sklearn.metrics.pairwise import cosine_similarity

import numpy as np
import pandas as pd
import time

import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset
from pydantic import BaseModel

router = APIRouter()

class DataStorage:
    def __init__(self, database_url="mysql+pymysql://ssafy:ssafy@j10c107.p.ssafy.io/talkydoki"):
        self.engine = create_engine(database_url)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()
        self.load_data()

    def load_data(self):
        users = self.session.query(Member).all()
        self.users = [user.id for user in users]

        categories = ['SOCIETY', 'BUSINESS', 'POLITICS', 'SCIENCE_CULTURE', 'INTERNATIONAL', 'SPORTS', 'LIFE', 'WEATHER_DISASTER']
        self.categories = categories
        category_kr = ['사회', '경제', '정치', '과학', '국제', '스포츠', '생활', '재난/날씨']
        category_map = dict(zip(categories, category_kr))

        articles = self.session.query(News).all()
        self.articles = [f"{category_map[article.category]}기사{article.id}" for article in articles]

        keywords = self.session.query(Keyword).all()
        mappings = self.session.query(NewsKeywordMapping).all()

        self.words = {keyword.id: {'word': keyword.japanese, 'categories': []} for keyword in keywords}
        for mapping in mappings:
            if mapping.keyword.id in self.words:
                self.words[mapping.keyword_id]['categories'].append(category_map[mapping.news.category])

        article_word_data = {f"{category_map[mapping.news.category]}기사{mapping.news_id}_{mapping.keyword.japanese}": mapping.weight for mapping in mappings}

        self.article_word_df = pd.DataFrame(0, index=self.articles, columns=[info['word'] for info in self.words.values()])
        self.user_word_df = pd.DataFrame(0, index=self.users, columns=[info['word'] for info in self.words.values()])

        for key, value in article_word_data.items():
            article, word = key.rsplit('_', 1)
            if article in self.article_word_df.index and word in self.article_word_df.columns:
                self.article_word_df.at[article, word] = value

        individual_preferences = {
            1: '사회',
            2: '경제',
            3: '정치',
            4: '과학',
            5: '국제',
            6: '스포츠'
        }
        
        for i, user in enumerate(self.users):
            if user in individual_preferences:
                preferred_category = individual_preferences[user]
            else:
                # 나머지 사용자들의 경우 8개 카테고리 중 하나를 랜덤하게 선택
                preferred_category_index = (user - len(individual_preferences) - 1) % len(self.categories)
                preferred_category = self.categories[preferred_category_index]
            
            preferred_words = [word_id for word_id, info in self.words.items() if preferred_category in info['categories']]
            non_preferred_words = [word_id for word_id, info in self.words.items() if preferred_category not in info['categories']]

            num_to_exclude = int(len(preferred_words) * np.random.uniform(0.1, 0.15))
            excluded_words = np.random.choice(preferred_words, size=num_to_exclude, replace=False)

            for word in preferred_words:
                if word not in excluded_words:
                    count = np.random.randint(5, 11)  # 선호 단어에 대해 높은 학습 횟수
                    self.user_word_df.at[user, word] = count
                    # self.save_news_keyword_history(user, word, count)
                else:
                    self.user_word_df.at[user, word] = 0

            for word in non_preferred_words:
                count = np.random.randint(0, 5)  # 비선호 단어에 대해 낮은 학습 횟수
                self.user_word_df.at[user, word] = count
                # self.save_news_keyword_history(user, word, count)

        self.user_word_df_norm = (self.user_word_df - self.user_word_df.min()) / (self.user_word_df.max() - self.user_word_df.min())
        self.article_word_df_norm = (self.article_word_df - self.article_word_df.min()) / (self.article_word_df.max() - self.article_word_df.min())

        self.cosine_sim = cosine_similarity(self.user_word_df_norm.fillna(0), self.article_word_df_norm.fillna(0))
        self.cosine_sim_df = pd.DataFrame(self.cosine_sim, columns=self.articles, index=self.users)

        print("user_word_df:", self.user_word_df)
        print("article_word_df:", self.article_word_df)

    def save_news_keyword_history(self, user_id, keyword_id, read_count):
        try:
            history = NewsKeywordHistory(member_id=user_id, keyword_id=keyword_id, read_count=read_count)
            self.session.add(history)
            self.session.commit()
        except IntegrityError:
            # 중복된 값이 존재할 경우 여기서 캐치되며, 별도의 조치 없이 함수를 종료시킵니다.
            self.session.rollback()
            print("중복된 값이 존재하여 추가하지 않습니다.")
        except Exception as e:
            # 다른 종류의 예외가 발생한 경우, 세션 롤백 후 예외를 다시 발생시킵니다.
            self.session.rollback()
            raise e

data_storage = DataStorage()

@router.get("/recommend/news/{member_id}")
async def news_recommend(member_id: int):
    if member_id not in data_storage.users:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = data_storage.cosine_sim_df.loc[member_id].sort_values(ascending=False)
    recommendations = user_data.index.values.tolist()[:3]

    return {
        "memberId": member_id, 
        "recommendations": recommendations
        }

class MatrixFactorization(nn.Module):
    def __init__(self, num_users, num_items, latent_dim, dropout_rate=0.8, l2=0.01):
        super(MatrixFactorization, self).__init__()
        self.user_embedding = nn.Embedding(num_users, latent_dim)
        self.item_embedding = nn.Embedding(num_items, latent_dim)
        self.user_bias = nn.Embedding(num_users, 1)
        self.item_bias = nn.Embedding(num_items, 1)
        self.dropout = nn.Dropout(dropout_rate)
        self.l2 = l2

        nn.init.normal_(self.user_embedding.weight, mean=0.0, std=0.01)
        nn.init.normal_(self.item_embedding.weight, mean=0.0, std=0.01)
        nn.init.zeros_(self.user_bias.weight)
        nn.init.zeros_(self.item_bias.weight)

    def forward(self, user_indices, item_indices):
        user_latent = self.dropout(self.user_embedding(user_indices))
        item_latent = self.dropout(self.item_embedding(item_indices))
        user_bias = self.user_bias(user_indices).squeeze()
        item_bias = self.item_bias(item_indices).squeeze()

        prediction = torch.sum(user_latent * item_latent, dim=1) + user_bias + item_bias
        return prediction

    def loss(self, prediction, target):
        return F.mse_loss(prediction, target)

# 데이터셋 클래스 정의
class UserWordDataset(Dataset):
    def __init__(self, data):
        self.users = {user: idx for idx, user in enumerate(data.index)}
        self.items = {item: idx for idx, item in enumerate(data.columns)}
        self.ratings = data.values.flatten().astype(np.float32)

        user_indices = [self.users[user] for user in data.index.repeat(len(data.columns))]
        item_indices = [self.items[item] for item in np.tile(data.columns, len(data.index))]

        self.user_indices = np.array(user_indices)
        self.item_indices = np.array(item_indices)

    def __len__(self):
        return len(self.ratings)

    def __getitem__(self, idx):
        user = torch.tensor(self.user_indices[idx], dtype=torch.long)
        item = torch.tensor(self.item_indices[idx], dtype=torch.long)
        rating = torch.tensor(self.ratings[idx], dtype=torch.float)
        return user, item, rating

# 모델과 데이터셋을 로드하는 함수
def load_model_and_dataset(user_word_df):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model_path = 'best_model.pth'
    model_checkpoint = torch.load(model_path, map_location=device)
    
    num_users, num_items = len(user_word_df.index), len(user_word_df.columns)
    model = MatrixFactorization(num_users, num_items, latent_dim=270, dropout_rate=0.8)
    model.load_state_dict(model_checkpoint['model_state_dict'])
    model.to(device)
    model.eval()

    dataset = UserWordDataset(user_word_df)
    
    return model, dataset, device

model, dataset, device = load_model_and_dataset(data_storage.user_word_df)

class UserRecommendationRequest(BaseModel):
    user_index: int

@router.get("/recommend/word/{member_id}")
async def word_recommend(member_id: str):
    if member_id not in data_storage.users:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_index = data_storage.users.index(member_id)
    
    untrained_item_indices = []
    untrained_item_names = data_storage.user_word_df.iloc[user_index][data_storage.user_word_df.iloc[user_index] == 0].index.tolist()
    for item_name in untrained_item_names:
        item_index = dataset.items[item_name]
        untrained_item_indices.append(item_index)
    
    if not untrained_item_indices:
        return {"message": "No items to recommend for this user."}
    
    untrained_item_indices_tensor = torch.tensor(untrained_item_indices, dtype=torch.long, device=device)
    predictions = model(torch.tensor([user_index] * len(untrained_item_indices), device=device), untrained_item_indices_tensor)
    
    recommended_item_index = untrained_item_indices[torch.argmax(predictions).item()]
    recommended_item_name = list(dataset.items.keys())[list(dataset.items.values()).index(recommended_item_index)]
    
    return {
        "memberId": member_id, 
        "recommended_item": recommended_item_name
        }
