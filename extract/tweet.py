import tweepy
import configparser
import schedule
import time
import requests
import mysql.connector
from datetime import datetime, timedelta
import pytz

# read configs
config = configparser.ConfigParser()
config.read('config.ini')

api_key = config['twitter']['api_key']
api_key_secret = config['twitter']['api_key_secret']

access_token = config['twitter']['access_token']
access_token_secret = config['twitter']['access_token_secret']

# authentication
auth = tweepy.OAuthHandler(api_key, api_key_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

# list of usernames
usernames = [
#insert usernames here
]

# tweet limit per user
limit=300

def predict_sentiment(tweet):
    response = requests.post('http://localhost:8000/predict', json={'text': tweet})
    if response.status_code == 200:
        return response.json()['sentiment']
    else:
        print(f"Failed to predict sentiment: {response.content}")
        return None

def create_connection():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='pantaudb'
    )
    return conn

def save_to_database(data):
    conn = create_connection()
    cursor = conn.cursor()
    insert_query = "INSERT INTO tweets (usernameID, username, tweets, tweetsID, dateTime, rt, likes, sentiment) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    cursor.executemany(insert_query, data)
    conn.commit()
    cursor.close()
    conn.close()

def job():
    for user in usernames:
        tweets = tweepy.Cursor(api.user_timeline, screen_name=user, count=200, tweet_mode='extended').items(limit)

        data = []

        #get date 1 day ago Malaysia time
        mytz = pytz.timezone('Asia/Kuala_Lumpur')
        one_day_ago = datetime.now(mytz) - timedelta(days=1)

        for tweet in tweets:
            # only extract the last 2 days tweets
            if tweet.created_at.replace(tzinfo=pytz.UTC) >= one_day_ago:
                sentiment = predict_sentiment(tweet.full_text)
                data.append([tweet.user.id_str,
                            tweet.user.screen_name, 
                            tweet.full_text, 
                            tweet.id_str,
                            tweet.created_at, 
                            tweet.retweet_count,
                            tweet.favorite_count,
                            sentiment])

        save_to_database(data)
    print("Job scheduling done!")

schedule.every().day.at("12:11").do(job)

while True:
    schedule.run_pending()
    time.sleep(1)

