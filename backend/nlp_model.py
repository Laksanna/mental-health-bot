import json
import re
import joblib
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import nltk

try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

try:
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt_tab', quiet=True)

try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet', quiet=True)

from nltk.tokenize import word_tokenize

class NLPIntentClassifier:
    def __init__(self, intents_path='data/intents.json', model_path='models/intent_model.pkl'):
        self.intents_path = intents_path
        self.model_path = model_path
        self.intents_path = intents_path
        self.model_path = model_path
        
        with open(intents_path, 'r') as f:
            self.intents_data = json.load(f)
        
        if os.path.exists(model_path):
            self.pipeline = joblib.load(model_path)
        else:
            self.pipeline = None
    
    def preprocess_text(self, text):
        """Preprocess text: lowercase, remove punctuation, tokenize, remove stopwords, lemmatize"""
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        tokens = word_tokenize(text)
        # tokens = [self.lemmatizer.lemmatize(word) for word in tokens]
        return ' '.join(tokens)
    
    def train(self):
        """Train the intent classification model"""
        X_train = []
        y_train = []
        
        for intent, data in self.intents_data.items():
            for pattern in data['patterns']:
                X_train.append(self.preprocess_text(pattern))
                y_train.append(intent)
                
        # Hardcode override the exact frontend suggestion snippets so they perfectly snap 
        X_train.extend([
            "feeling great today", "share a win", "spread positivity",
            "im feeling down", "i need someone to talk to", "can we do a breathing exercise",
            "im really frustrated", "need to vent", "how to calm down",
            "help me with my anxiety", "im feeling scared", "grounding exercise",
            "that was unexpected", "im shocked",
            "how are you", "just wanted to chat", "mental wellness tips",
            "this is bothering me", "feeling unsettled"
        ])
        y_train.extend([
            "positive_mood", "positive_mood", "positive_mood",
            "depression", "loneliness", "anxiety",
            "anger", "anger", "anger",
            "anxiety", "anxiety", "anxiety",
            "surprise", "surprise",
            "greeting", "greeting", "greeting",
            "disgust", "disgust"
        ])
        
        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(ngram_range=(1, 2))),
            ('classifier', LogisticRegression(max_iter=500, random_state=42, class_weight='balanced'))
        ])
        
        self.pipeline.fit(X_train, y_train)
        
        os.makedirs('models', exist_ok=True)
        joblib.dump(self.pipeline, self.model_path)
        
        return self.pipeline
    
    def predict_intent(self, text):
        """Predict intent from user text"""
        if self.pipeline is None:
            self.train()
        
        processed_text = self.preprocess_text(text)
        intent = self.pipeline.predict([processed_text])[0]
        
        return intent
