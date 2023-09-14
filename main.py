from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database import Base, SessionLocal, engine
from src.environment import ALLOWED_ORIGINS
from src.contracts import CreateCompletionRequest
from sqlalchemy.orm import Session
import src.openai_client as openai_client

# Generate the tables if they don't exist yet
Base.metadata.create_all(bind=engine)

# Start server
app = FastAPI()


# Set up dependency injection for database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Set up CORS rules
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=['OPTIONS', 'GET', 'POST'],
    allow_headers=['*']
)


@app.post('/completion')
def create_completion(request: CreateCompletionRequest, db: Session = Depends(get_db)):

    completion = openai_client.create_chat_completion(request.message)
    return {'message': 'Works'}
