# models/keyword.py
from sqlalchemy import Column, BigInteger, String
from sqlalchemy.orm import relationship
from database import Base

class Keyword(Base):
    __tablename__ = "keyword"

    id = Column(BigInteger, primary_key=True, index=True)
    japanese = Column(String(255), nullable=False)
    news_keyword_mappings = relationship("NewsKeywordMapping", back_populates="keyword")
    news_keyword_histories = relationship("NewsKeywordHistory", back_populates="keyword")