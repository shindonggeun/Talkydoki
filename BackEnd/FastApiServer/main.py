# main.py
from fastapi import FastAPI
from database import engine, Base

from routes.vocabulary import router as vocabulary_router
from recommendation.recommendation import router as recommendation_router
from data_processing.news import router as news_router

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

# fake = Faker()

# async_engine = create_async_engine("mysql+aiomysql://ssafy:ssafy@j10c107.p.ssafy.io/talkydoki", echo=True)

# AsyncSessionLocal = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=async_engine,
#     class_=AsyncSession
# )

# async def get_db():
#     async with AsyncSessionLocal() as session:
#         yield session

# async def create_dummy_users(db: AsyncSession, num_users: int):
#     for _ in range(num_users):
#         email = fake.email()
#         password = fake.password()
#         name = fake.name()
#         nickname = fake.user_name()

#         db_user = Member(email=email, password=password, name=name, nickname=nickname)
#         db.add(db_user)
#     await db.commit()

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     async with AsyncSessionLocal() as db:
#         await create_dummy_users(db, 1000)
#     yield

app = FastAPI()

app.include_router(news_router)
app.include_router(vocabulary_router)
app.include_router(recommendation_router)

Base.metadata.create_all(bind = engine)