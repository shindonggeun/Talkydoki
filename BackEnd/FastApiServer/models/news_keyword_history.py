from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class NewsKeywordHistory(Base):
    __tablename__ = "news_keyword_history"
    id = Column(Integer, primary_key=True, index=True)
    read_count = Column(Integer, default=0, nullable=False)
    member_id = Column(Integer, ForeignKey("member.id"))
    member = relationship("Member", back_populates="news_keyword_histories")
    keyword_id = Column(Integer, ForeignKey("keyword.id"))
    keyword = relationship("Keyword", back_populates="news_keyword_histories")