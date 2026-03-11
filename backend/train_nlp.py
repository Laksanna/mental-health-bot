from nlp_model import NLPIntentClassifier

def train_nlp_model():
    """Train and save the NLP intent classification model"""
    print("Training NLP Intent Classification Model...")
    
    classifier = NLPIntentClassifier()
    classifier.train()
    
    print("Model trained and saved successfully!")
    
    test_messages = [
        "hello",
        "I'm feeling really stressed",
        "I'm so anxious about everything",
        "feeling lonely today",
        "goodbye"
    ]
    
    print("\nTesting model predictions:")
    for msg in test_messages:
        intent = classifier.predict_intent(msg)
        print(f"Message: '{msg}' -> Intent: {intent}")

if __name__ == "__main__":
    train_nlp_model()
