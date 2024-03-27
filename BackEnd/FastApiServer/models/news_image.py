# models/news_image.py
from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class NewsImage(Base):
    __tablename__ = "news_image"

    id = Column(BigInteger, primary_key=True, index=True)
    image_url = Column(String(255), nullable=False)
    news_id = Column(BigInteger, ForeignKey("news.id"))
    news = relationship("News", back_populates="news_images")