import json
import random
import os

data_dir = os.path.dirname(os.path.abspath(__file__))
intents_file = os.path.join(data_dir, 'intents.json')

with open(intents_file, 'r') as f:
    intents = json.load(f)

synonyms = {
    "stress": ["stress", "pressure", "burden", "tension", "strain", "struggle", "anxiety", "weight", "agitation"],
    "overwhelmed": ["overwhelmed", "drowning", "buried", "suffocating", "too much", "crushed", "overloaded", "swamped"],
    "tired": ["tired", "exhausted", "drained", "fatigued", "burnt out", "sleepy", "weary", "depleted"],
    "work": ["work", "job", "studies", "school", "project", "homework", "responsibilities", "exams", "coursework", "business"],
    "hard": ["hard", "difficult", "tough", "impossible", "challenging", "unbearable", "rough", "too much"],
    "anxious": ["anxious", "nervous", "worried", "uneasy", "tense", "panicking", "fearful", "jittery", "fretful"],
    "fear": ["fear", "scared", "terrified", "frightened", "petrified", "spooked", "paralyzed with fear"],
    "depressed": ["depressed", "sad", "miserable", "down", "blue", "heartbroken", "gloomy", "melancholy", "despondent"],
    "hopeless": ["hopeless", "pointless", "meaningless", "empty", "worthless", "desperate", "without hope"],
    "lonely": ["lonely", "alone", "isolated", "abandoned", "forgotten", "alienated", "friendless"],
    "no one": ["no one", "nobody", "zero people", "not a single person", "literally practically nobody"],
    "failure": ["failure", "loser", "disappointment", "mistake", "letdown", "mess up", "fraud"],
    "happy": ["happy", "great", "excellent", "fantastic", "amazing", "wonderful", "joyful", "thrilled", "elated"],
    "excited": ["excited", "thrilled", "pumped", "enthusiastic", "eager", "stoked"],
    "goodbye": ["goodbye", "bye", "see ya", "later", "farewell", "gotta go", "leaving now", "I must leave", "Catch you later"]
}

templates = {
    "stress": [
        "I am feeling so {stress} today.",
        "The {stress} from {work} is {hard}.",
        "I feel totally {overwhelmed} by everything.",
        "My {work} is making me {tired}.",
        "I can't handle this {stress} anymore.",
        "Why is everything so {hard}?",
        "I'm totally {tired} of the {pressure}.",
        "I'm drowning in {work}."
    ],
    "anxiety": [
        "I am so {anxious} about the future.",
        "My mind is {anxious} and I can't stop {anxious} thoughts.",
        "I feel {fear} building up inside me.",
        "I'm really {fear} of what's going to happen.",
        "I can't stop shaking, I am {anxious}.",
        "I am feeling very {anxious} today."
    ],
    "depression": [
        "I feel completely {depressed}.",
        "Everything seems so {hopeless}.",
        "I am so {depressed} I can't even get out of bed.",
        "I feel {hopeless} and {depressed}.",
        "I'm feeling incredibly {depressed} right now.",
        "There is no point, I am {hopeless}."
    ],
    "loneliness": [
        "I am so {lonely}.",
        "I feel like {no one} cares about me.",
        "I am completely {lonely} and {no one} is here.",
        "I have {no one} to talk to.",
        "I'm feeling very {lonely} today."
    ],
    "self_doubt": [
        "I am a complete {failure}.",
        "I feel like a {failure} at {work}.",
        "Everything I do is a {failure}.",
        "I am a {failure} and I hate myself."
    ],
    "positive_mood": [
        "I am feeling {happy} today!",
        "Today was a {happy} day.",
        "I am so {excited} for tomorrow.",
        "My {work} went great, I am {happy}."
    ],
}

fillers = ["Right now, ", "Honestly, ", "I just think ", "Lately, ", "To be honest, ", "I must admit, ", "Oh, ", "Um, ", "Sometimes, ", "Basically, ", "Well, ", "You know, ", "I feel like ", "Obviously, ", ""]
endings = ["", " a lot.", " recently.", " right now.", " all the time.", ". Please help.", ". It sucks.", ". I hate it.", ". It's literally the worst.", ". What should I do?", " today.", " this week."]

def expand_template(template):
    result = template
    for key, val_list in synonyms.items():
        if f"{{{key}}}" in result:
            result = result.replace(f"{{{key}}}", random.choice(val_list))
    return result

print("Expanding intents dataset...")

for intent_key, pattern_templates in templates.items():
    if intent_key in intents:
        new_patterns = set(intents[intent_key]["patterns"])
        misses = 0
        while len(new_patterns) < 600 and misses < 1000:
            tmpl = random.choice(pattern_templates)
            phrase = expand_template(tmpl)
            prefix = random.choice(fillers)
            suffix = random.choice(endings)
            final_phrase = prefix + phrase + suffix
            clean_phrase = final_phrase.strip().lower()
            if clean_phrase in new_patterns:
                misses += 1
            else:
                new_patterns.add(clean_phrase)
                misses = 0
        intents[intent_key]["patterns"] = list(new_patterns)

for intent_key in intents:
    if intent_key not in templates:
        new_patterns = set(intents[intent_key]["patterns"])
        base_patterns = list(new_patterns)
        misses = 0
        while len(new_patterns) < 500 and misses < 1000:
            prefix = random.choice(fillers)
            suffix = random.choice(endings)
            base = random.choice(base_patterns)
            clean_phrase = (prefix + base + suffix).strip().lower()
            if clean_phrase in new_patterns:
                misses += 1
            else:
                new_patterns.add(clean_phrase)
                misses = 0
        intents[intent_key]["patterns"] = list(new_patterns)

with open(intents_file, 'w') as f:
    json.dump(intents, f, indent=4)

with open(intents_file, 'r') as f:
    lines = len(f.readlines())

print(f"Dataset successfully expanded! Intents.json is now {lines} lines long.")
