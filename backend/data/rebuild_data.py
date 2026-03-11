import json
import random
import os

data_dir = os.path.dirname(os.path.abspath(__file__))
intents_file = os.path.join(data_dir, 'intents.json')

intents = {
    "greeting": {
        "responses": ["Hello! I'm here to listen. How are you feeling today?", "Hi there! I'm glad you're here. What's on your mind?", "Hey! Feel free to share what you're going through."]
    },
    "stress": {
        "responses": ["It sounds like you're under a lot of stress. Would you like to talk about what's weighing on you?", "Stress can be really challenging. Taking things one step at a time might help.", "I hear you. Sometimes breaking down big problems into smaller ones can make them feel more manageable."]
    },
    "anxiety": {
        "responses": ["It sounds like you're feeling anxious. Would you like to talk about what's worrying you?", "Sometimes anxiety can feel overwhelming. Taking slow breaths may help calm your mind.", "Anxiety is tough. Remember that these feelings will pass. What's making you feel this way?"]
    },
    "depression": {
        "responses": ["I'm sorry you're feeling this way. Your feelings are valid, and you deserve support.", "Depression can make everything feel heavy. Please know that you're not alone in this.", "It takes courage to share these feelings. Have you considered reaching out to a mental health professional?"]
    },
    "loneliness": {
        "responses": ["Feeling lonely can be very difficult. Remember that you're not alone in this.", "Would you like to share what has been on your mind today?", "Loneliness is a hard feeling. Connecting with others, even in small ways, can help."]
    },
    "self_doubt": {
        "responses": ["Self-doubt is something many people experience. You are more capable than you think.", "It's okay to have doubts, but don't let them define you. What are you struggling with?", "You've overcome challenges before. This moment doesn't define your worth."]
    },
    "motivation": {
        "responses": ["Sometimes we all need a reminder of our strength. What's one small thing you can do today?", "It's okay to rest. Progress isn't always linear, and that's perfectly fine.", "You've made it this far, and that's something to be proud of. Keep going, one step at a time."]
    },
    "positive_mood": {
        "responses": ["I'm so glad to hear that! Focus on these positive moments.", "That's wonderful! What made your day so great?", "I'm happy for you. It's important to celebrate the good days.", "Keep that positive energy going! Anything you're particularly excited about?"]
    },
    "anger": {
        "responses": ["I can see you're really frustrated right now. Do you want to vent about it?", "It's completely okay to feel angry when things are unfair. What happened?", "Anger is a natural emotion. Take your time, I'm here to listen to why you're mad."]
    },
    "goodbye": {
        "responses": ["Take care of yourself. I'm here whenever you need to talk.", "Goodbye! Remember, you're stronger than you think.", "See you later. Don't hesitate to come back anytime."]
    }
}

vocab = {
    "greeting": [
        "hi", "hello", "hey", "good morning", "good evening", "greetings", "howdy", "what's up",
        "how are you", "how are things", "are you there", "good afternoon", "heya", "yo",
        "how's it going", "what is up", "need to talk", "hi there", "hello bot",
        "just wanted to chat", "mental wellness tips", "advice", "help me"
    ],
    "stress": [
        "exam", "test", "finals", "deadline", "work", "homework", "school", "college", 
        "stressed", "stress", "overwhelmed", "pressure", "burden", "too much", "crushed",
        "busy", "exhausting", "exhausted", "hard time", "studying", "boss", "coworkers", "manager"
    ],
    "anxiety": [
        "anxious", "anxiety", "nervous", "worried", "panic", "scared", "fear", "shaking",
        "racing heart", "overthinking", "uneasy", "afraid", "freaking out", "terrified",
        "future worries", "can't breathe", "sweating", "paranoid", "worry",
        "help me with my anxiety", "i'm feeling scared", "grounding exercise", "calm down"
    ],
    "depression": [
        "depressed", "depression", "sad", "hopeless", "crying", "empty", "numb", "give up",
        "worthless", "miserable", "pointless", "down", "sorrow", "grief", "heartbroken",
        "can't get out of bed", "tired of living", "no meaning", "useless", "i'm feeling down"
    ],
    "loneliness": [
        "lonely", "alone", "isolated", "no one", "nobody", "friendless", "ignored",
        "single", "left out", "abandoned", "no friends", "missing someone", "feel invisible",
        "no support", "everyone left me", "feel disconnected", "talk with me", "someone to talk to", "chat with me", "listen to me", "i want to talk", "talk to me"
    ],
    "self_doubt": [
        "failure", "not good enough", "useless", "stupid", "idiot", "mess up", "ruined",
        "imposter", "doubt myself", "mistake", "can't do it", "never succeed",
        "fraud", "incompetent", "weak", "disappointment", "let everyone down"
    ],
    "motivation": [
        "lazy", "uninspired", "no motivation", "procrastinating", "can't start", "stuck",
        "no energy", "need inspiration", "motivate me", "give me a push", "tired",
        "burnout", "don't want to work", "can't focus", "distracted"
    ],
    "positive_mood": [
        "happy", "great", "excellent", "excited", "wonderful", "amazing", "good day",
        "productive", "success", "blessed", "joy", "smile", "passed", "won", "feeling good",
        "fantastic", "best day", "thrilled", "glad", "pumped",
        "feeling great today", "share a win", "spread positivity"
    ],
    "anger": [
        "angry", "mad", "furious", "hate", "scolded", "yelled", "fight", "fought",
        "annoyed", "frustrated", "pissed", "unfair", "irritated", "rage", "screaming",
        "upset", "betrayed", "lied to", "friend scolded me", "argued",
        "i'm really frustrated", "need to vent", "how to calm down"
    ],
    "goodbye": [
        "bye", "goodbye", "see you", "gotta go", "thanks", "thank you",
        "exit", "quit", "leave", "later", "catch you later", "farewell", "speak later"
    ]
}

# Advanced sentence wrappers depending on the context of the intent
wrappers = {
    "greeting": ["{w}", "oh, {w}", "{w}!", "um, {w}"],
    "stress": ["I have {w} tomorrow", "The {w} is too much", "I'm feeling {w}", "I can't handle this {w}", "So much {w} right now", "Dealing with {w}", "I'm drowned in {w}", "My {w} is killing me"],
    "anxiety": ["I am so {w}", "My {w} is bad", "I feel {w}", "Experiencing {w}", "Why am I so {w}", "Stop this {w}", "I can't stop feeling {w}", "Overcome by {w}"],
    "depression": ["I feel incredibly {w}", "Everything is {w}", "I am so {w}", "Why is life so {w}", "I'm just {w}", "Feeling completely {w}", "Dealing with severe {w}"],
    "loneliness": ["I am {w}", "Feeling {w} today", "I feel so {w}", "Why am I so {w}", "I am completely {w}", "Just feeling {w}"],
    "self_doubt": ["I am a {w}", "I feel like a {w}", "I am {w}", "Why am I so {w}", "I think I'm a {w}", "I made a {w}"],
    "motivation": ["I am too {w}", "I feel {w}", "I have {w}", "I'm {w}", "Just feeling {w}", "Overcome with {w}"],
    "positive_mood": ["I am {w}!", "Feeling {w} today", "Today was {w}", "Everything is {w}", "I feel so {w}", "Super {w} right now"],
    "anger": ["I am so {w}", "I feel {w}", "I absolutely {w} this", "I got {w}", "Someone {w}", "I am {w} right now", "Extremely {w}"],
    "goodbye": ["{w}", "Ok, {w}", "Well, {w}", "I will say {w}"]
}

print("Building massive high-quality dataset...")

for intent, data in intents.items():
    patterns = set()
    words = vocab[intent]
    
    # 1. Base Words (Standalone)
    for w in words:
        patterns.add(w)
    
    # 2. Wrapped Words
    for w in words:
        for wrap in wrappers[intent]:
            patterns.add(wrap.replace("{w}", w).lower().strip())
            
    # 3. Combinations (Two-word pairs to build rich sentences)
    import itertools
    pairs = list(itertools.combinations(words, 2))
    random.shuffle(pairs)
    # Take up to 200 pairs
    for p in pairs[:250]:
        w1, w2 = p
        templates = [
            f"I have {w1} and {w2}",
            f"Dealing with {w1} makes me feel {w2}",
            f"So much {w1}, feeling {w2}",
            f"{w1} and {w2}",
            f"I am {w1} because of {w2}"
        ]
        patterns.add(random.choice(templates).lower().strip())
        
    # Additional random fillers loop
    fillers_start = ["honestly", "lately", "right now", "today", "yesterday", "i think", "i just"]
    base_patterns = list(patterns)
    while len(patterns) < 450:
        p = random.choice(base_patterns)
        f = random.choice(fillers_start)
        patterns.add(f"{f} {p}")
        
    intents[intent]["patterns"] = list(patterns)

# Output completely restructured json dataset
with open(intents_file, 'w') as f:
    json.dump(intents, f, indent=4)

total = sum(len(i["patterns"]) for i in intents.values())
print(f"Generated {total} incredibly diverse, class-specific natural language patterns!")
