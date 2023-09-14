from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database import Base, engine
from src.environment import ALLOWED_ORIGINS
from src.routers import messages, documents

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

# Set up API routes
app.include_router(messages.router)
app.include_router(documents.router)
