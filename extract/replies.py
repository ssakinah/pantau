import tweepy
import ssl
import configparser  
import schedule
import time
import requests
import mysql.connector
from datetime import datetime, timedelta
import pytz

ssl._create_default_https_context = ssl._create_unverified_context

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

# get date string for 1 day ago
yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")

# Predict sentiment
def predict_sentiment(tweet):
    response = requests.post('http://localhost:8000/predict', json={'text': tweet})
    if response.status_code == 200:
        return response.json()['sentiment']
    else:
        print(f"Failed to predict sentiment: {response.content}")
        return None

# Create connection to MySQL database
def create_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='pantaudb'
    )
    return connection

# Insert tweets data into the MySQL database
def insert_into_database(data):
    conn = create_connection()
    cursor = conn.cursor()
    insert_query = """
    INSERT INTO replies (`bank`, `name`, `username`, `usernameID`, `reply`, `replyID`, `dateTime`, `rt`, `likes`, `sentiment`, `replyURL`, `tweetID`, `tweetURL`)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    cursor.executemany(insert_query, data)
    conn.commit()
    cursor.close()
    conn.close()

def job():
    usernames = [
        'RHBGroup',
        'MyMaybank',
        'CIMBMalaysia',
        'AmBankMY',
        'MYHongLeong',
        'myBankRakyat',
        'AffinMy',
        'PublicBankMY',
        'OCBCBank',
        'myBankIslam',
        'AllianceBankMY',
        'MyBankMuamalat',
        'AgrobankMY'
    ] 

    for name in usernames:
        limit = 300

        all_id = []

        # Get date 1 day ago Malaysia time
        mytz = pytz.timezone('Asia/Kuala_Lumpur')
        one_day_ago = datetime.now(mytz) - timedelta(days=1)

        for status in tweepy.Cursor(api.user_timeline, screen_name=name).items(limit):
            # Only process tweets that are from the last day
            if status.created_at > one_day_ago:
                if status.in_reply_to_status_id_str is None:
                    all_id.append(status.id)

        banks = []          # Bank name
        user_id = []        # User ID
        username = []       # Username
        display_name = []   # Display name
        reply_id = []       # Reply ID
        reply_url = []      # Reply URL
        reply_text = []     # Reply tweet text
        sentiment = []      # Sentiment
        date_created = []   # Reply created_at
        like_count = []     # Like count
        rt_count = []       # Retweet count
        tweet_id = []       # Tweet ID
        tweet_url = []      # Tweet URL

        # FROM user to name
        rr = api.search_tweets(q='to:' + name, count=100, tweet_mode='extended', result_type='recent') # Grab recent tweets
        for tweett in rr:
            if tweett.in_reply_to_status_id in all_id and tweett.in_reply_to_screen_name != name: 
                banks.append(name)
                user_id.append(tweett.user.id)
                username.append(tweett.user.screen_name)
                display_name.append(tweett.user.name)
                reply_id.append(tweett.id)
                reply_url.append(f"https://twitter.com/{tweett.user.screen_name}/status/{tweett.id}")
                reply_text.append(tweett.full_text)
                sentiment.append(predict_sentiment(tweett.full_text))
                date_created.append(tweett.created_at) 
                like_count.append(tweett.favorite_count)
                rt_count.append(tweett.retweet_count)
                tweet_url.append(f"https://twitter.com/{name}/status/{tweett.in_reply_to_status_id}")
                tweet_id.append(tweett.in_reply_to_status_id)

        # FROM name to user
        r = api.search_tweets(q=name, count=100, tweet_mode='extended', result_type='recent') # Grab recent tweets
        for tweet in r:
            if tweet.in_reply_to_status_id in all_id and tweet.in_reply_to_screen_name != name: 
                banks.append(name)
                user_id.append(tweet.user.id)
                username.append(tweet.user.screen_name)
                display_name.append(tweet.user.name)
                reply_id.append(tweet.id)
                reply_url.append(f"https://twitter.com/{tweet.user.screen_name}/status/{tweet.id}")
                reply_text.append(tweet.full_text)
                sentiment.append(predict_sentiment(tweet.full_text))
                date_created.append(tweet.created_at)
                like_count.append(tweet.favorite_count)
                rt_count.append(tweet.retweet_count)
                tweet_url.append(f"https://twitter.com/{name}/status/{tweet.in_reply_to_status_id}")
                tweet_id.append(tweet.in_reply_to_status_id)

        # Merge them by using zip().  
        list_tuples = list(zip(banks, display_name, username, user_id, reply_text, reply_id, date_created, rt_count, like_count, sentiment, reply_url, tweet_id, tweet_url))  

        # Save to MySQL database
        insert_into_database(list_tuples)

    print("Job scheduling done!")
    
schedule.every().day.at("12:00").do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
