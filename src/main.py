from database import create_db_and_tables, get_session, engine
from models import Note
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from fastapi import FastAPI, Depends, HTTPException

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.middleware(CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/create_note")
def create_note(note: Note, session: Session = Depends(get_session)):
    session.add(note)
    session.commit()
    session.refresh(note)
    return {"note_id": note.id}

@app.get("/get_note/{note_id}")
def get_note(note_id: str, session: Session = Depends(get_session)):
    note = session.get(Note, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    
    content = note.content

    session.delete(note)
    session.commit()

    return {"content": content}