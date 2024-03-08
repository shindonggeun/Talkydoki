# models/vocabulary.py
from sqlalchemy import Column, BigInteger, String
from database import Base

class Vocabulary(Base):
    __tablename__ = "vocabulary"

    vocabulary_id = Column(BigInteger, primary_key=True, index=True)
    japanese = Column(String(255), nullable=False)
    korean = Column(String(255), nullable=False)
    japanese_read = Column(String(255), nullable=False)
    type = Column(String(30), nullable=True)
