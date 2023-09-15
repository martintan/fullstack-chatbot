from fastapi import APIRouter, Depends, WebSocket
from sqlalchemy.orm import Session

import src.models as models
import src.openai_client as openai_client
from src.database import get_db
from src.routers.contracts import MessageRequest

router = APIRouter(
    prefix='/messages',
    tags=['messages'],
    responses={404: {'description': 'Not found'}},
)


@router.get('/')
def get_messages(
    # Unused for now
    sender: str, 
    db: Session = Depends(get_db)
):
    return db.query(models.ChatMessage).all()


def create_chat_message(db: Session, request: MessageRequest):
    user_message = {'role': 'user', 'content': request.message}

    # Retrieve messages from DB
    print('Getting existing conversation...')
    messages = db.query(models.ChatMessage).all()
    # Transform messages to OpenAI's format
    formatted_messages = [{'role': m.sender, 'content': m.message} for m in messages]
    # Add our new message
    formatted_messages.append(user_message)

    print('Inserting message to database...')
    request_message = models.ChatMessage(
        session_id=None,
        message=request.message,
        tokens=len(request.message),
        sender='user'
    )
    db.add(request_message)

    print('Creating chat completion...:')
    completion = openai_client.create_chat_completion(formatted_messages)
    print("Completion:", completion)

    print('Inserting answer to database...')
    answer = models.ChatMessage(
        session_id=completion.id,
        message=completion.choices[0].message.content,
        tokens=completion.usage.total_tokens,
        sender='system'
    )

    # Finalize DB transaction
    db.add(answer)
    db.commit()
    db.refresh(answer)

    return (request_message, answer)