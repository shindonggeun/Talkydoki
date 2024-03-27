from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class NewsShadowing(Base):
    __tablename__ = "news_shadowing"
    id = Column(Integer, primary_key=True, index=True)
    news_id = Column(Integer, ForeignKey("news.id"))
    news = relationship("News", back_populates="news_shadowing")
    member_id = Column(Integer, ForeignKey("member.id"))
    member = relationship("Member", back_populates="news_shadowings")