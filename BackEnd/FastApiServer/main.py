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
            file.write(f"ID\n{news.id}\nTITLE\n{news.title}\nSUMMARY\n{news.summary}\nCONTENT\n{news.content}\n")

@app.get("/fetch-news")
def fetch_news_to_file(db: Session = Depends(get_db)):
    news_data = get_news(db)
    save_data(news_data)
    return {"message": "News data fetched and saved successfully!"}