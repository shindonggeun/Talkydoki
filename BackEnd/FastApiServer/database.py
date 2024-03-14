# database.py
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import database_exists, create_database, drop_database

DATABASE_URL = "mysql+pymysql://ssafy:ssafy@localhost/talkydoki"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

hadoop_query = "SELECT title, content, summary FROM news"
df = pd.read_sql(hadoop_query, engine)
df.to_csv('news_data.csv', index = False)