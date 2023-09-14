from pydantic import BaseModel


class CreateCompletionRequest(BaseModel):
    message: str