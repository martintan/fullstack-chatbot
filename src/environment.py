import os
from typing import Optional
from dotenv import dotenv_values

config = {
    # Load values from OS environment
    **os.environ,
    # Load any values from .env.local
    **dotenv_values('.env.local')
}

OPENAI_CLIENT_API_TYPE = config['OPENAI_CLIENT_API_TYPE']
OPENAI_CLIENT_API_BASE_URL = config['OPENAI_CLIENT_API_BASE_URL']
OPENAI_CLIENT_API_VERSION = config['OPENAI_CLIENT_API_VERSION']
OPENAI_CLIENT_API_KEY = config['OPENAI_CLIENT_API_KEY']
OPENAI_CLIENT_ENGINE = config['OPENAI_CLIENT_ENGINE']

ALLOWED_ORIGINS: Optional[str] = config['ALLOWED_ORIGINS']
ALLOWED_ORIGINS = ALLOWED_ORIGINS.split(',') if ALLOWED_ORIGINS else []

POSTGRES_DB_URL = config['POSTGRES_DB_URL']