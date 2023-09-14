from fastapi import APIRouter, Depends
from src.routers.contracts import CreateCompletionRequest
from sqlalchemy.orm import Session
from src.database import get_db
import src.openai_client as openai_client
import src.models as models


router = APIRouter(
    prefix='/messages',
    tags=['messages'],
    responses={404: {'description': 'Not found'}},
)


@router.post('/')
def create_chat_message(request: CreateCompletionRequest, db: Session = Depends(get_db)):
    user_message = {'role': 'user', 'content': request.message}

    print('Getting existing conversation...')
    messages = db.query(models.ChatMessage).filter(
        models.ChatMessage.sender == 'test').all()
    messages.append(user_message)

    print('Creating chat completion...:', messages)
    completion = openai_client.create_chat_completion(messages)

    print('Inserting to database...')
    message = models.ChatMessage(
        session_id=completion.id,
        message=request.message,
        tokens=completion.usage.total_tokens,
        sender='test'
    )
    db.add(message)
    db.commit()
    db.refresh(message)

    return message


@router.get('/')
def get_messages(sender: str, db: Session = Depends(get_db)):
    return db.query(models.ChatMessage).filter(models.ChatMessage.sender == sender).all()
