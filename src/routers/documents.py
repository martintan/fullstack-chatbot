from fastapi import APIRouter, Depends
from src.routers.contracts import CreateCompletionRequest
from sqlalchemy.orm import Session
from src.database import get_db
import src.openai_client as openai_client


router = APIRouter(
    prefix='/documents',
    tags=['documents'],
    responses={404: {'description': 'Not found'}},
)


@router.post('/')
def upload_document(request: CreateCompletionRequest, db: Session = Depends(get_db)):

    completion = openai_client.create_chat_completion(request.message)
    return {'message': 'works'}
