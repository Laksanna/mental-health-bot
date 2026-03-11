from nlp_model import NLPIntentClassifier

c = NLPIntentClassifier()
print('Model trained and initialized!')
print('How are you?', c.predict_intent('How are you?'))
print('i have exam tommorrow', c.predict_intent('i have exam tommorrow'))
print('my friend scolded me', c.predict_intent('my friend scolded me'))
print('replies are not correct????', c.predict_intent('replies are not correct????'))
print('I am so anxious about everything', c.predict_intent('I am so anxious about everything'))
