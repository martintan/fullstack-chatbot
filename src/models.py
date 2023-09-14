from sqlalchemy import Column, DateTime, Integer, String, func
from src.database import Base, engine


class ChatMessage(Base):
    __tablename__ = 'chat_messages'

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(String, nullable=False)
    message = Column(String, nullable=False)
    sender = Column(String, nullable=False)
    tokens = Column(Integer, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

