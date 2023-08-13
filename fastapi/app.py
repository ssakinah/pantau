# cd fastapi
# env\Scripts\activate
# uvicorn app:app --reload

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
from text_preprocessor import preprocess_text
import mysql.connector

# Create the FastAPI app
app = FastAPI()

# Enable CORS
origins = [
    "http://localhost:3000",  # React's default port
    "http://localhost:5000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

# Function to convert numeric sentiment to a string
def sentiment_to_string(sentiment):
    if sentiment == -1:
        return 'Negative'
    elif sentiment == 0:
        return 'Neutral'
    elif sentiment == 1:
        return 'Positive'
    else:
        return 'Unknown'

# Define the request body for the POST endpoint
class SentimentRequest(BaseModel):
    text: str

# Define the response for the POST endpoint
class SentimentResponse(BaseModel):
    sentiment: str  # this can now be 'Negative', 'Neutral', or 'Positive'

# Function to create a database connection
def create_connection():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='pantaudb'
    )
    return conn

@app.post('/predict', response_model=SentimentResponse)
async def predict(request: SentimentRequest):
    # Preprocess the text
    preprocessed_text = preprocess_text(request.text)
    # Predict the sentiment of the text
    sentiment_numeric = model.predict([preprocessed_text])[0]
    sentiment_string = sentiment_to_string(sentiment_numeric)
    
    return SentimentResponse(sentiment=sentiment_string)
