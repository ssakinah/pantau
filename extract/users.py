import tweepy
import configparser
import pandas as pd

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

# list of usernames to fetch details
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

# create DataFrame
columns = ['User ID',
           'User',
           'Display Name',
           'Description',
           'Account Created',
           'Total Followers',
           'Total Following',
           'Total Tweets',
           'Pfp']
data = []

for username in usernames:
    # Fetch user details
    user = api.get_user(screen_name=username)

    data.append([
        user.id_str,
        user.screen_name,
        user.name,
        user.description,
        user.created_at,
        user.followers_count,
        user.friends_count,
        user.statuses_count,
        user.profile_image_url.replace('_normal', '')  # Modify URL for higher resolution
    ])

df = pd.DataFrame(data, columns=columns)

df.to_csv('user_details.csv')
