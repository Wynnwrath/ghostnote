from sqlmodel import Field, SQLModel
from datetime import datetime  
import secrets
import string

def generate_id() -> str:
    alphabet = string.ascii_letters + string.digits
    return "".join(secrets.choice(alphabet) for _ in range(9))

class Note(SQLModel, table=True):
    id: str = Field(default_factory=generate_id, primary_key=True)
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow) 
    expires_at: datetime | None = None 