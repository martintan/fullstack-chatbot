from io import BytesIO
import PyPDF2
from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

import src.models as models
import src.openai_client as openai_client
from src.database import get_db
from src.routers.contracts import MessageRequest

router = APIRouter(
    prefix='/documents',
    tags=['documents'],
    responses={404: {'description': 'Not found'}},
)


@router.post('/')
async def upload_document(file: UploadFile, db: Session = Depends(get_db)):
    if not file:
        return {"message": "File is required"}
    else:
        file_data = await file.read()
        text = extract_text(BytesIO(file_data))
        completion = openai_client.create_chat_completion([
            { 'role': 'user', 'content': f'Summarize this document: {text}' }
        ])
        answer = models.ChatMessage(
            session_id=completion.id,
            message=completion.choices[0].message.content,
            tokens=completion.usage.total_tokens,
            sender='system'
        )
        db.add(answer)
        db.commit()
        db.refresh(answer)
        return answer.to_dict()


def extract_text(pdf_bytes_stream):
    reader = PyPDF2.PdfReader(pdf_bytes_stream)
    text = ''
    for i in range(len(reader.pages)):
        page = reader.pages[i]
        text += page.extract_text()
    return text


def create_embedding():
    pass