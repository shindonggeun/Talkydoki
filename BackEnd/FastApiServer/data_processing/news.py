from fastapi import Depends, HTTPException, APIRouter
from fastapi.responses import FileResponse
from database import SessionLocal
from sqlalchemy.orm import Session
from datetime import datetime
from models.news import News

import requests, subprocess, os

router = APIRouter()

execution_env = os.getenv("EXECUTION_ENV", "LOCAL")

API_URL = "http://j10c107.p.ssafy.io:8080"

# 데이터베이스 세션 생성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_news(db: Session):
    return db.query(News.id, News.title, News.content, News.summary).all()

def save_data_ec2(news_data, filename = "news_data.txt", path="/input"):
    full_path = f"{path}/{filename}"
    with open(full_path, "w", encoding = "utf-8") as file:
        for news in news_data:
            file.write(f"ID\n{news.id}\nTITLE\n{news.title}\nSUMMARY\n{news.summary}\nCONTENT\n{news.content}\n")

def save_data_local(news_data, filename = "news_data.txt"):
    with open(filename, "w", encoding = "utf-8") as file:
        for news in news_data:
            file.write(f"ID\n{news.id}\nTITLE\n{news.title}\nSUMMARY\n{news.summary}\nCONTENT\n{news.content}\n")

def generate_output_path(base_path="/TF_output"):
    timestamp = datetime.now().strftime("%Y%m%d")
    return f"{base_path}/{timestamp}"

def start_hadoop_streaming():
    output_path = generate_output_path()
    hadoop_command = f"hadoop jar /usr/local/hadoop/share/hadoop/tools/lib/hadoop-streaming-*.jar -files /home/ubuntu/data-processing/TF_mapper.py,/home/ubuntu/data-processing/TF_reducer.py -mapper 'python3 /home/ubuntu/data-processing/TF_mapper.py' -reducer 'python3 /home/ubuntu/data-processing/TF_reducer.py' -input /input/news_data.txt -output /TF_output/{output_path}"
    try:
        subprocess.run(hadoop_command, check=True, shell=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error executing Hadoop Streaming Job : {e}")
        return False

@router.get("/fetch-news")
async def fetch_news_to_file(db: Session = Depends(get_db)):
    news_data = get_news(db)
    
    if execution_env == "EC2":
        save_data_ec2(news_data, path="/input")
        if start_hadoop_streaming():
            message = "News data fetched and Hadoop Streaming job started successfully!"
            # Hadoop Streaming 작업 성공 시 extract_japanese 호출
            await extract_japanese()
        else:
            message = "News data fetched, but failed to start Hadoop Streaming job."
    else:
        save_data_local(news_data)
        message = "News data fetched and saved successfully!"
    
    return {"message": message}

@router.get("/extract-japanese")
async def extract_japanese():
    if execution_env == "EC2":
        base_path = "/TF_output"
        today_str = datetime.now().strftime("%Y%m%d")
        input_path = os.path.join(base_path, today_str, "part-00000")
        
        if not os.path.exists(input_path):
            raise HTTPException(status_code=404, detail="Result file not found for today.")
    else:
        input_filename = "local_part-00000.txt"

        try:
            with open(input_filename, "r", encoding = "utf-8") as file:
                content = file.readlines()
        except FileNotFoundError:
            raise HTTPException(status_code = 404, detail = "File not found")
    
    unique_words = set()

    for line in content:
        words = line.split()
        if len(words) > 2:
            japanese_word = words[1]
            unique_words.add(japanese_word)
    
    result_filename = "japanese.txt"
    with open(result_filename, "w", encoding = "utf-8") as file:
        for word in sorted(unique_words):
            file.write(word + "\n")
    
    # extract_japanese 작업 성공 시 upload_keywords 호출
    await upload_keywords()

    return FileResponse(result_filename)

@router.get("/upload-keywords")
async def upload_keywords():
    input_filename = "japanese.txt"
    if execution_env == "EC2":
        if not os.path.exists(input_filename):
            raise HTTPException(status_code=404, detail="japanese.txt file not found")

    try:
        with open(input_filename, "r", encoding="utf-8") as file:
            for line in file:
                japanese = line.strip()
                keyword_data = {
                    "japanese": japanese
                }
                response = requests.post(f'{API_URL}/api/v1/keywords/post', json=keyword_data)
                
                if response.status_code != 200:
                    return {"message": f"Failed to insert keyword: {japanese}", "status_code": response.status_code}
                
        return {"message": "All keywords were successfully inserted."}
    except FileNotFoundError:
        raise HTTPException(status_code = 404, detail = "File not found")