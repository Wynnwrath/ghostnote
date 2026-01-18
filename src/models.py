from sqlmodel import Field, SQLModel
import secrets
import string

#generator for unique note IDs
def generate_id() -> str:
    alphabet = string.ascii_letters + string.digits
    return "".join(secrets.choice(alphabet) for _ in range(9))

class Note(SQLModel, table=True):
    id: str = Field(default_factory=generate_id, primary_key=True)
    content: str