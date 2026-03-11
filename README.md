# 🧠 MindCare AI: Emotion-Aware Mental Health Companion

MindCare AI is a next-generation mental health support system that combines real-time facial emotion recognition with Natural Language Processing (NLP) to provide a truly empathetic chat experience.

![MindCare Demo](https://img.shields.io/badge/Status-Beta-teal)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_FastAPI_|_TensorFlow-blue)

## ✨ Advanced Features

- **📸 Real-time Emotion Detection**: Uses OpenCV and a custom Convolutional Neural Network (CNN) to analyze facial expressions through your webcam.
- **🎯 Intelligent Bounding Box**: A real-time visual overlay that tracks your face and displays the AI's detected emotion live on the camera feed.
- **🎭 Proactive Empathy**: The AI doesn't just wait for you to speak. If it detects a sustained mood (like sadness or anxiety), it will proactively reach out to offer support.
- **🌈 Dynamic Mood UI**: The entire application's ambiance (background gradients and animations) shifts color in real-time to reflect your emotional state.
- **💬 Context-Aware Chat**: Custom NLP intent classification translates your thoughts into actionable mental health categories (Stress, Anxiety, Loneliness, etc.).
- **🔒 Secure & Private**: JWT-based authentication ensures your safe space remains private.

## 🛠️ Technology Stack

| Layer | Technologies |
|--- |--- |
| **Frontend** | React, Vite, Tailwind CSS, Axios, React Webcam |
| **Backend** | Python, FastAPI, JWT (Authentication), Bcrypt |
| **AI/ML** | TensorFlow/Keras (CNN), Scikit-learn (NLP), OpenCV, NLTK |
| **Styling** | Vanilla CSS, Framer Motion (Animations) |

## 📁 Project Structure

```text
mindcare-ai/
├── backend/
│   ├── data/
│   │   ├── intents.json     # Trained dialogue patterns
│   │   └── users.json       # (Gitignored) User database
│   ├── models/              # Saved ML models (.h5, .pkl)
│   ├── main.py              # FastAPI core server
│   ├── emotion_detection.py # CNN Computer Vision logic
│   ├── nlp_model.py         # Intent classification logic
│   └── chatbot_engine.py    # Empathy & response generation
├── frontend/
│   ├── src/
│   │   ├── components/      # UI Blocks (Webcam, ChatWindow)
│   │   ├── pages/           # Views (Landing, Auth, Chat)
│   │   └── api.js           # Backend communication
│   └── tailwind.config.js   # Custom design system
└── dataset/                 # (Gitignored) FER-2013 training data
```

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.9+ 
- Node.js 16+
- Webcam access

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🧠 Brain Logic

The system uses a two-stage analysis process:
1. **Vision**: A CNN trained on the FER-2013 dataset identifies 7 facial emotions (Happy, Sad, Angry, Fear, Surprise, Neutral, Disgust).
2. **Language**: A Logistic Regression model with TF-IDF vectorization identifies the intent of your message.

The **Response Engine** then merges these inputs to create a nuanced, empathetic reply.

## ⚠️ Disclaimer

**This chatbot is not a licensed therapist.** If you are experiencing serious mental health issues or a crisis, please contact professional emergency services or a crisis hotline immediately (e.g., 988 in the US/Canada).

---
Built with ❤️ for mental wellness accessibility.
