from sqlmodel import Field, SQLModel
import secrets
import string

# id generator
def generate_id() -> str:
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for _ in range(9))

class Note(SQLModel, table=True):
    id: str = Field(default_factory=generate_id, primary_key=True)
    content: str