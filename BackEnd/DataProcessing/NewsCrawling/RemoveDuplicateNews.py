import os
import sys
import json

sys.path.append('/usr/src/app')
from Url import DUPLICATENEWS_PATH, DAYS_NEWS_PATH

# 폴더 내의 모든 파일을 가져옴
file_list = os.listdir(DUPLICATENEWS_PATH)

# 모든 파일을 순회하면서 중복을 제거
for file_name in file_list:
    # json 파일인지 확인
    if file_name.endswith('.json'):
        input_file_path = os.path.join(DUPLICATENEWS_PATH, file_name)
        output_file_path = os.path.join(DAYS_NEWS_PATH, file_name)

        # 중복된 ID를 추적하기 위한 집합(set) 생성
        seen_ids = set()

        # 새로운 데이터를 저장할 리스트
        new_data = []

        # JSON 파일을 열고 데이터를 읽어옴
        with open(input_file_path, 'r', encoding='utf-8') as json_file:
            news_data = json.load(json_file)
            for news_item in news_data:
                news_id = news_item["newsId"]
                if news_id not in seen_ids:
                    # 중복이 아닌 경우 해당 뉴스 아이템을 저장하고 seen_ids에 추가
                    new_data.append(news_item)
                    seen_ids.add(news_id)

        # 폴더가 없는 경우 폴더를 생성
        os.makedirs(os.path.dirname(output_file_path), exist_ok=True)
        
        # 새로운 데이터를 기존 형식에 맞게 파일에 쓰기
        with open(output_file_path, "w", encoding="utf-8") as file:
            for news_item in new_data:
                file.write(f"ID\n{news_item['newsId']}\nTITLE\n{news_item['title']}\nSUMMARY\n{news_item['summary']}\nCONTENT\n{news_item['content']}\n")
