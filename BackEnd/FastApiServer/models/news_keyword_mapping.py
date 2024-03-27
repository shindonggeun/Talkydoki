from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class NewsKeywordMapping(Base):
    __tablename__ = "news_keyword_mapping"
    id = Column(Integer, primary_key=True, index=True)
    weight = Column(Float)
    news_id = Column(Integer, ForeignKey("news.id"))
    news = relationship("News", back_populates="news_keyword_mappings")
    keyword_id = Column(Integer, ForeignKey("keyword.id"))
    keyword = relationship("Keyword", back_populates="news_keyword_mappings")