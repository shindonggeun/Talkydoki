# main.py
from fastapi import FastAPI
from sqlalchemy import MetaData
from database import engine
from models.vocabulary import Vocabulary
from routes.vocabulary import router as vocabulary_router


app = FastAPI()

app.include_router(vocabulary_router)

# 서버 시작 시 테이블 생성
@app.on_event("startup")
def startup_event():
    # MetaData 인스턴스 생성
    metadata = MetaData()
    # 모든 테이블을 metadata에 바인드
    metadata.create_all(engine, tables=[Vocabulary.__table__])

# 서버 종료 시 테이블 삭제
@app.on_event("shutdown")
def shutdown_event():
    # MetaData 인스턴스 생성
    metadata = MetaData()
    # 지정된 테이블만 삭제
    metadata.drop_all(engine, tables=[Vocabulary.__table__])
