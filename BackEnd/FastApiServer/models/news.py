# models/news.py
from sqlalchemy import Column, ForeignKey, BigInteger, String, Text, Float
from sqlalchemy.orm import relationship
from database import Base

class News(Base):
    __tablename__ = "news"

    id = Column(BigInteger, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)

class Keyword(Base):
    __tablename__ = "keyword"

    id = Column(BigInteger, primary_key=True, index=True)
    japanese = Column(String(255), nullable=False)

class NewsKeywordMapping(Base):
    __tablename__ = "news_keyword_mapping"

    id = Column(BigInteger, primary_key=True, index=True)
    weight = Column(Float)
    news_id = Column(BigInteger, ForeignKey("news.id"))
    keyword_id = Column(BigInteger, ForeignKey("keyword.id"))
    news = relationship("News")
    keyword = relationship("Keyword")