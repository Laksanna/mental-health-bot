import jwt
import bcrypt
from datetime import datetime, timedelta
from typing import Optional
import json
import os

SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

class AuthManager:
    def __init__(self, users_file='data/users.json'):
        self.users_file = users_file
        self._ensure_users_file()
    
    def _ensure_users_file(self):
        """Create users file if it doesn't exist"""
        if not os.path.exists(self.users_file):
            os.makedirs(os.path.dirname(self.users_file), exist_ok=True)
            with open(self.users_file, 'w') as f:
                json.dump({}, f)
    
    def _load_users(self):
        """Load users from file"""
        with open(self.users_file, 'r') as f:
            return json.load(f)
    
    def _save_users(self, users):
        """Save users to file"""
        with open(self.users_file, 'w') as f:
            json.dump(users, f, indent=2)
    
    def hash_password(self, password: str) -> str:
        """Hash a password"""
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a password"""
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    
    def create_user(self, email: str, password: str, name: str) -> dict:
        """Create a new user"""
        users = self._load_users()
        
        if email in users:
            return {"success": False, "message": "Email already registered"}
        
        users[email] = {
            "email": email,
            "name": name,
            "password": self.hash_password(password),
            "created_at": datetime.now().isoformat()
        }
        
        self._save_users(users)
        return {"success": True, "message": "User created successfully"}
    
    def authenticate_user(self, email: str, password: str) -> Optional[dict]:
        """Authenticate a user"""
        users = self._load_users()
        
        if email not in users:
            return None
        
        user = users[email]
        if not self.verify_password(password, user['password']):
            return None
        
        return {"email": user['email'], "name": user['name']}
    
    def create_access_token(self, data: dict) -> str:
        """Create JWT access token"""
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    def verify_token(self, token: str) -> Optional[dict]:
        """Verify JWT token"""
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
