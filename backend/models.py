from pydantic import BaseModel
from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class Subscriber(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class TTSRequest(BaseModel):
    text: str
    voice_id: Optional[str] = "default"
    speed: Optional[float] = 1.0

class TTSResponse(BaseModel):
    audio_url: str
    message: str

class EmailSubscription(BaseModel):
    email: str

class WaitlistEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    company: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
