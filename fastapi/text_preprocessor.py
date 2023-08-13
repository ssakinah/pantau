import re
import nltk
nltk.download('punkt')

with open('stopwords-ms.txt', 'r') as f:
    stop_words = [line.strip() for line in f]

def preprocess_text(text):
    # Remove URLs
    text = re.sub(r'http\S+', '', text)
    # Remove hashtags
    text = re.sub(r'#[A-Za-z0-9]+', '', text)
    # Remove mentions
    text = re.sub(r'@[A-Za-z0-9]+', '', text)
    # Remove emojis
    text = re.sub(r'[^\w\s]', '', text)
    # Tokenize text
    tokens = nltk.word_tokenize(text.lower())
    # Remove stopwords
    tokens = [token for token in tokens if token not in stop_words]
    # Join tokens back into string
    text = ' '.join(tokens)
    return text
