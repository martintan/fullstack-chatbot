import json

from fastapi import Depends, FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from src.database import Base, engine, get_db
from src.environment import ALLOWED_ORIGINS
from src.routers import documents, messages
from src.routers.contracts import MessageRequest

# Base.metadata.drop_all(bind=engine)
# Generate the tables if they don't exist yet
Base.metadata.create_all(bind=engine)

# Start server
app = FastAPI()


# Set up CORS rules
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=['OPTIONS', 'GET', 'POST'],
    allow_headers=['*']
)

@app.websocket('/ws')
async def websocket_messaging(websocket: WebSocket, db: Session = Depends(get_db)):
    await websocket.accept()
    try:
        while True:
            request = await websocket.receive_json()
            print('Received message:', request)
            message_request = MessageRequest(message=request['message'])

            print('Creating chat message:', message_request)
            request_message, answer = messages.create_chat_message(db, message_request)
            
            print('Sending back answer:', answer.to_dict())
            await websocket.send_json({
                'messages': [request_message.to_dict(), answer.to_dict()]
            })
    except Exception as ex:
        print('WebSocket error caught:', ex)

# Set up API routes
app.include_router(messages.router)
app.include_router(documents.router)
app.add_api_websocket_route('/messages/ws', websocket_messaging)
