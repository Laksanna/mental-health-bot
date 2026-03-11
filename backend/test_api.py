import requests
import json

base_url = 'http://127.0.0.1:8000'

# Create user
email = "test@example.com"
password = "password123"
requests.post(f"{base_url}/signup", json={"email": email, "password": password, "name": "Test User"})

# Login
login_res = requests.post(f"{base_url}/login", json={"email": email, "password": password}).json()
token = login_res.get("access_token", "")

headers = {"Authorization": f"Bearer {token}"}

# Chat
messages = ["How are you?", "Mental wellness tips", "talk with me", "i want to talk", "chat with me"]

for msg in messages:
    res = requests.post(f"{base_url}/chat", json={"message": msg, "emotion": "neutral"}, headers=headers)
    print(f"{msg}: {res.status_code}")
    if res.status_code == 200:
        print(f" -> {res.json()}")
    else:
        print(f" -> {res.text}")
