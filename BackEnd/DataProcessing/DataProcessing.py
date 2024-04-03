import requests, os
from Url import KEYWORDS_API_URL, DOCKER_OUTPUT_PATH
from Hadoop.Hadoop import make_input_data, copy_to_hdfs, copy_from_hdfs, start_hadoop_streaming

make_input_data()
if not copy_to_hdfs():
    print("Failed to copy file to HDFS")

if not start_hadoop_streaming():
    print("message : News data fetched and copied to HDFS, but failed to start Hadoop Streaming job.")

if not copy_from_hdfs():
    print("Failed to copy file from HDFS\n")

try:
    with open(DOCKER_OUTPUT_PATH, "r", encoding="utf-8") as file:
        content = file.readlines()

    news_data = {}

    for line in content:
        parts = line.strip().split("\t")
        if len(parts) == 3:
            news_id, japanese, weight = parts
            if news_id not in news_data:
                news_data[news_id] = []
            news_data[news_id].append((japanese, float(weight)))

    for news_id, keywords in news_data.items():
        top_5_keywords = sorted(keywords, key=lambda x: x[1], reverse=True)[:5]
        data = {
            "newsId": int(news_id),
            "keywords": [{"japanese": japanese, "weight": weight} for japanese, weight in top_5_keywords]
        }
        try:
            response = requests.post(f'{KEYWORDS_API_URL}/weight', json=data)
        except Exception as e:
            print(f"Failed to send data for news ID {news_id}, Error: {str(e)}\n")

except FileNotFoundError:
    print("File not found\n")

print("데이터 프로세싱 완료")