import openai
from .environment import OPENAI_CLIENT_API_BASE_URL, OPENAI_CLIENT_API_KEY, OPENAI_CLIENT_API_TYPE, OPENAI_CLIENT_API_VERSION, OPENAI_CLIENT_ENGINE

openai.api_type = OPENAI_CLIENT_API_TYPE
openai.api_base = OPENAI_CLIENT_API_BASE_URL
openai.api_version = OPENAI_CLIENT_API_VERSION
openai.api_key = OPENAI_CLIENT_API_KEY


def create_chat_completion(message: str):
    return openai.ChatCompletion.create(
        engine=OPENAI_CLIENT_ENGINE,
        messages=[message],
        temperature=0.3,
        max_tokens=350,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None,
    )


def create_embedding(embedding_input: str):
    return openai.Embedding.create(
        engine=OPENAI_CLIENT_ENGINE,
        input=embedding_input
    )
