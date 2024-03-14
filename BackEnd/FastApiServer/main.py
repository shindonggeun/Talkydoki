# main.py
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy import MetaData
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models.vocabulary import Vocabulary
from models.news import News
from routes.vocabulary import router as vocabulary_router
import subprocess

app = FastAPI()

app.include_router(vocabulary_router)

# 데이터베이스 세션 생성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 서버 시작 시 테이블 생성
# @app.on_event("startup")
# def startup_event():
#     # MetaData 인스턴스 생성
#     metadata = MetaData()
#     # 모든 테이블을 metadata에 바인드
#     metadata.create_all(engine, tables=[Vocabulary.__table__])

# 서버 종료 시 테이블 삭제
# @app.on_event("shutdown")
# def shutdown_event():
#     # MetaData 인스턴스 생성
#     metadata = MetaData()
#     # 지정된 테이블만 삭제
#     metadata.drop_all(engine, tables=[Vocabulary.__table__])

Base.metadata.create_all(bind = engine)

def get_news(db: Session):
    return db.query(News.id, News.title, News.content, News.summary).all()

def save_data(news_data, filename = "news_data.txt"):
    with open(filename, "w", encoding = "utf-8") as file:
        for news in news_data:
            file.write(f"ID : {news.id}\nTITLE : {news.title}\nSUMMARY : {news.summary}\nCONTENT : {news.content}\n")

@app.get("/fetch-news")
def fetch_news_to_file(db: Session = Depends(get_db)):
    news_data = get_news(db)
    save_data(news_data)
    return {"message": "News data fetched and saved successfully!"}

@app.post("/test/")
async def test_hadoop_streaming():
    # mapper.py 실행 후 출력을 파일에 직접 저장
    mapper_cmd = "python wordcount_mapper.py < news_data.txt > temp_mapper_output.txt"
    subprocess.run(mapper_cmd, shell=True, check=True)

    # reducer.py 실행
    reducer_cmd = "sort temp_mapper_output.txt | python wordcount_reducer.py"
    reducer_result = subprocess.run(reducer_cmd, shell=True, text=True, capture_output=True)

    # 임시 파일 삭제
    subprocess.run("rm temp_mapper_output.txt", shell=True)

    # reducer의 결과를 반환
    processed_data = reducer_result.stdout
    return {"processed_data": processed_data}