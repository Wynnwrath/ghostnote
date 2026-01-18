from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel
from database import create_db_and_tables, get_session
from models import Note
from datetime import datetime, timedelta # 
import os

app = FastAPI()

class NoteInput(SQLModel):
    content: str
    duration_minutes: int = 1440 # 24 hours

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    os.getenv("FRONTEND_URL", "")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Keep it simple for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/create_note")
def create_note(note_input: NoteInput, session: Session = Depends(get_session)):
    # Calculate when this note should die
    expiration = datetime.utcnow() + timedelta(minutes=note_input.duration_minutes)
    
    # Save to DB
    new_note = Note(content=note_input.content, expires_at=expiration)
    session.add(new_note)
    session.commit()
    session.refresh(new_note)
    return {"note_id": new_note.id}

@app.post("/read/{note_id}")
def read_note(note_id: str, session: Session = Depends(get_session)):
    note = session.get(Note, note_id)
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    # Check if expired
    if datetime.utcnow() > note.expires_at:
        session.delete(note) # Delete it so it's gone forever
        session.commit()
        raise HTTPException(status_code=404, detail="Note expired")
    
    # If safe, return content and destroy
    content = note.content
    session.delete(note)
    session.commit()
    
    return {"content": content}