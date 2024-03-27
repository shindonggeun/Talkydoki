from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from enum import Enum as PyEnum

class MemberRole(PyEnum):
    USER = "USER"
    ADMIN = "ADMIN"

class Member(Base):
    __tablename__ = "member"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    nickname = Column(String(255), nullable=False)
    role = Column(Enum(MemberRole), default=MemberRole.USER, nullable=False)
    news_keyword_histories = relationship("NewsKeywordHistory", back_populates="member")
    news_shadowings = relationship("NewsShadowing", back_populates="member")