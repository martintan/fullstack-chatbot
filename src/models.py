from sqlalchemy import Column, DateTime, Integer, String, func
from src.database import Base, engine


class ChatMessage(Base):
    __tablename__ = 'chat_messages'

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(String, nullable=True)
    message = Column(String, nullable=False)
    sender = Column(String, nullable=False)
    tokens = Column(Integer, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'session_id': self.session_id,
            'message': self.message,
            'sender': self.sender,
            'tokens': self.tokens,
            'timestamp': self.timestamp.strftime('%m/%d/%Y, %H:%M:%S'),
        }
