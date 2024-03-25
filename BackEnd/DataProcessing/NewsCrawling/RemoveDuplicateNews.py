import os
from Url import DUPLICATENEWS_PATH, DAYS_NEWS_PATH

# 폴더 내의 모든 파일을 가져옴
file_list = os.listdir(DUPLICATENEWS_PATH)

# 모든 파일을 순회하면서 중복을 제거
for file_name in file_list:
    # txt 파일인지 확인
    if file_name.endswith('.txt'):
        input_file_path = os.path.join(DUPLICATENEWS_PATH, file_name)
        output_file_path = os.path.join(DAYS_NEWS_PATH, file_name)

        # 중복된 ID를 추적하기 위한 집합(set) 생성
        seen_ids = set()

        # 새로운 데이터를 저장할 리스트
        new_lines = []

        # 파일을 열고 각 뉴스 아이템을 읽어옴
        with open(input_file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
            i = 0
            while i < len(lines):
                news_id = lines[i+1].strip()  # newsid 추출
                if news_id not in seen_ids:
                    # 중복이 아닌 경우 해당 뉴스 아이템을 저장하고 seen_ids에 추가
                    new_lines.extend(lines[i:i+6])
                    seen_ids.add(news_id)
                i += 6

        # 폴더가 없는 경우 폴더를 생성
        os.makedirs(os.path.dirname(output_file_path), exist_ok=True)
        # 파일을 다시 쓰기 모드로 열고 새로운 뉴스 아이템들을 쓴다.
        with open(output_file_path, 'w', encoding='utf-8') as file:
            file.writelines(new_lines)