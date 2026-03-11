from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from emotion_detection import EmotionDetector
from nlp_model import NLPIntentClassifier
from chatbot_engine import ChatbotEngine
from auth import AuthManager

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

emotion_detector = EmotionDetector()
nlp_classifier = NLPIntentClassifier()
chatbot_engine = ChatbotEngine()
auth_manager = AuthManager()

if nlp_classifier.pipeline is None:
    print("Training NLP model...")
    nlp_classifier.train()
    print("NLP model ready!")

class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    name: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ChatRequest(BaseModel):
    message: str
    emotion: str

def verify_token(authorization: Optional[str] = Header(None)):
    """Verify JWT token from Authorization header"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != 'bearer':
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
        
        payload = auth_manager.verify_token(token)
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        
        return payload
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header")

@app.get("/")
async def root():
    return {"message": "Emotion-Aware Mental Health Chatbot API"}

@app.post("/signup")
async def signup(request: SignupRequest):
    """Register a new user"""
    result = auth_manager.create_user(request.email, request.password, request.name)
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["message"])
    
    return {"message": result["message"]}

@app.post("/login")
async def login(request: LoginRequest):
    """Login user and return JWT token"""
    user = auth_manager.authenticate_user(request.email, request.password)
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = auth_manager.create_access_token({"sub": user["email"], "name": user["name"]})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.post("/detect-emotion")
async def detect_emotion(file: UploadFile = File(...), user: dict = Depends(verify_token)):
    """Detect emotion from uploaded image"""
    contents = await file.read()
    result = emotion_detector.detect_emotion(contents)
    return result

@app.post("/chat")
async def chat(request: ChatRequest, user: dict = Depends(verify_token)):
    # Special handling for proactive emotion detection
    if request.message == "[PROACTIVE_DETECTION]":
        response = chatbot_engine.get_response('greeting', request.emotion)
        return {
            "intent": "proactive_greeting",
            "response": response,
            "emotion": request.emotion
        }

    intent = nlp_classifier.predict_intent(request.message)
    response = chatbot_engine.get_response(intent, request.emotion)
    
    return {
        "intent": intent,
        "response": response,
        "emotion": request.emotion
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
