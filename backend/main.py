from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlmodel import Session, select
from models import TTSRequest, TTSResponse, Subscriber, EmailSubscription, WaitlistEntry
from tts_engine import tts_engine
from database import create_db_and_tables, get_session
import os

app = FastAPI(title="MekaHime Backend")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for audio serving
os.makedirs("static/audio", exist_ok=True)
app.mount("/files", StaticFiles(directory="static/audio"), name="files")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "MekaHime Backend is running"}

@app.post("/api/generate-tts", response_model=TTSResponse)
def generate_tts(request: TTSRequest):
    try:
        filename = tts_engine.generate_audio(request.text, request.voice_id)
        # Construct full URL (assuming localhost for now, can be updated)
        audio_url = f"/files/{filename}" 
        return TTSResponse(audio_url=audio_url, message="Audio generated successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/subscribe")
def subscribe(subscription: EmailSubscription, session: Session = Depends(get_session)):
    try:
        # Check if email already exists
        statement = select(Subscriber).where(Subscriber.email == subscription.email)
        existing_subscriber = session.exec(statement).first()
        
        if existing_subscriber:
            return {"message": "Email already subscribed"}
            
        new_subscriber = Subscriber(email=subscription.email)
        session.add(new_subscriber)
        session.commit()
        session.refresh(new_subscriber)
        return {"message": "Successfully subscribed", "id": new_subscriber.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/waitlist")
def join_waitlist(entry: WaitlistEntry, session: Session = Depends(get_session)):
    try:
        # Optional: Check if email already exists in waitlist?
        # For now, let's allow duplicates or handle it silently?
        # Let's just save it.
        session.add(entry)
        session.commit()
        session.refresh(entry)
        return {"message": "Successfully joined waitlist", "id": entry.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


