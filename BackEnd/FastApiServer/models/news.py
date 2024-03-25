# models/news.py
from sqlalchemy import Column, BigInteger, String, Text, DateTime
from sqlalchemy.orm import relationship
from database import Base

class News(Base):
    __tablename__ = "news"

    id = Column(BigInteger, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)
    write_date = Column(DateTime, nullable=False)
    news_images = relationship("NewsImage", back_populates="news")
    news_keyword_mappings = relationship("NewsKeywordMapping", back_populates="news")