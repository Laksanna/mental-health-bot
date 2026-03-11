import json
import random

class ChatbotEngine:
    def __init__(self, intents_path='data/intents.json'):
        with open(intents_path, 'r') as f:
            self.intents_data = json.load(f)
    
    def get_response(self, intent, emotion):
        """Get response based on intent and emotion"""
        if intent not in self.intents_data:
            intent = 'greeting'
        
        responses = self.intents_data[intent]['responses']
        base_response = random.choice(responses)
        
        emotion_prefix = self._get_emotion_acknowledgment(emotion)
        
        if emotion_prefix:
            return f"{emotion_prefix} {base_response}"
        
        return base_response
    
    def _get_emotion_acknowledgment(self, emotion):
        """Add emotion-aware prefix to response"""
        acknowledgments = {
            'happy': [
                "It's wonderful to see you smiling!",
                "I'm glad you're in a good mood today.",
                "Your positive energy is great!",
                "I can see you're feeling quite happy."
            ],
            'sad': [
                "I notice you're looking a bit down. I'm here for you.",
                "You seem a little sad today. Let's talk about it.",
                "I sense some sadness in your expression. I'm listening.",
                "I can see things might be tough right now."
            ],
            'angry': [
                "I can sense some frustration or anger. It's okay to feel this way.",
                "I notice you're looking a bit upset. Do you want to vent?",
                "I sense some tension. What's bothering you?",
                "I'm here to listen if you want to let that anger out."
            ],
            'fear': [
                "You look a bit worried. Is everything okay?",
                "I sense some anxiety in your expression. Take a deep breath.",
                "It seems like something is bothering you. You're safe here.",
                "I'm here to help you get through these worries."
            ],
            'surprise': [
                "You look quite surprised! What happened?",
                "Something unexpected? I'm curious to hear.",
                "That expression tells me something caught you off guard!"
            ],
            'neutral': [
                "", # Let neutral be naturally integrated
                "I'm here to listen whenever you're ready.",
                "How can I support you today?"
            ],
            'disgust': [
                "Something's clearly not right. Do you want to talk about it?",
                "I can see you're feeling a bit unsettled.",
                "I notice some discomfort in your expression."
            ]
        }
        
        choices = acknowledgments.get(emotion, [""])
        return random.choice(choices) if choices else ""
