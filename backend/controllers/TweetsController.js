import Tweets from "../models/TweetsModel.js";

export const getTweets = async(req, res) =>{
  try {
      const response = await Tweets.findAll();
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}

export const getTweetsById = async(req, res) =>{
  try {
      const response = await Tweets.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}

  export const getEngagementByUser = async(req, res) => {
    try {
        // Get all tweets
        const tweets = await Tweets.findAll();

        // Object to hold the total likes and retweets for each user
        let engagementByUser = {};

        tweets.forEach(tweet => {
            if (!engagementByUser[tweet.username]) {
                engagementByUser[tweet.username] = { totalLikes: 0, totalRetweets: 0 };
            }
            engagementByUser[tweet.username].totalLikes += tweet.likes;
            engagementByUser[tweet.username].totalRetweets += tweet.rt;
        });

        // Find the max likes and retweets
        let maxLikes = 0, maxRetweets = 0;
        
        for (const username in engagementByUser) {
            if (engagementByUser[username].totalLikes > maxLikes) {
                maxLikes = engagementByUser[username].totalLikes;
            }
            if (engagementByUser[username].totalRetweets > maxRetweets) {
                maxRetweets = engagementByUser[username].totalRetweets;
            }
        }

        res.status(200).json({ 
            data: engagementByUser,
            maxLikes: maxLikes,
            maxRetweets: maxRetweets
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const getTopTweets = async (req, res) => {
  try {
    const response = await Tweets.findAll({
      order: [
        [
          Sequelize.literal('likes + rt'),
          'DESC'
        ]
      ], // Orders rows by the sum of likes, retweets, and replies in descending order
      limit: 5 // Selects only 5 rows from the table
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getEngagementRate = async(req, res) => {
  try {
    const tweets = await Tweets.findAll();

    let totalLikes = 0;
    let totalRetweets = 0;

    for (let i = 0; i < tweets.length; i++) {
      totalLikes += tweets[i].likes;
      totalRetweets += tweets[i].rt;
    }

    const totalEngagement = totalLikes + totalRetweets;
    const engagementRate = totalEngagement / tweets.length;

    res.status(200).json({ engagementRate: engagementRate.toFixed(2) });
  } catch (error) {
    console.log(error.message);
  }
};

