import Mentioned from "../models/MentionedModel.js";
import Replies from "../models/RepliesModel.js";
import Users from "../models/UsersModel.js";
import Tweets from "../models/TweetsModel.js";

export const getORS = async (req, res) => {
    try {
        const mentionedData = await Mentioned.findAll();
        const repliesData = await Replies.findAll();
        const usersData = await Users.findAll();
        const tweetsData = await Tweets.findAll();

        const combinedData = [...mentionedData, ...repliesData];

        let sentimentCounts = {};
        let usersInfo = {};
        let tweetsInfo = {};

        usersData.forEach(user => {
            usersInfo[user.username] = { totalTweets: user.totalTweets, followers: user.followers };
        });

        tweetsData.forEach(tweet => {
            const bank = tweet.username; // Assuming "username" field in tweet corresponds to "bank"

            if (!tweetsInfo[bank]) {
                tweetsInfo[bank] = { totalLikes: 0, totalRT: 0 };
            }

            tweetsInfo[bank].totalLikes += tweet.likes;
            tweetsInfo[bank].totalRT += tweet.rt;
        });

        combinedData.forEach(dataPoint => {
            const bank = dataPoint.bank;
            const sentiment = dataPoint.sentiment;

            if (!sentimentCounts[bank]) {
                sentimentCounts[bank] = { positive: 0, negative: 0, neutral: 0 };
            }

            if (sentiment === 'Positive') {
                sentimentCounts[bank].positive += 1;
            } else if (sentiment === 'Negative') {
                sentimentCounts[bank].negative += 1;
            } else if (sentiment === 'Neutral') {
                sentimentCounts[bank].neutral += 1;
            }
        });

        let maxSentimentScore = 0;
        let maxFollowers = 0;
        let maxTotalTweets = 0;
        let maxTotalLikes = 0;
        let maxTotalRT = 0;

        const attributes = [];
        for (const bank in sentimentCounts) {
            const { positive, negative, neutral } = sentimentCounts[bank];
            const sentimentScore = calculateSentimentScore(positive, negative, neutral);
            const { totalTweets, followers } = usersInfo[bank] || { totalTweets: 0, followers: 0 };
            const { totalLikes, totalRT } = tweetsInfo[bank] || { totalLikes: 0, totalRT: 0 };
        
            maxSentimentScore = Math.max(maxSentimentScore, sentimentScore); // Fixed variable name
            maxFollowers = Math.max(maxFollowers, followers);
            maxTotalTweets = Math.max(maxTotalTweets, totalTweets);
            maxTotalLikes = Math.max(maxTotalLikes, totalLikes);
            maxTotalRT = Math.max(maxTotalRT, totalRT);
        
            attributes.push({ 
                bank: bank, 
                sentimentScore: sentimentScore, 
                totalTweets: totalTweets, 
                followers: followers, 
                totalLikes: totalLikes, 
                totalRT: totalRT
            });
        }
        

        // Calculate ORS after finding the maximums
        attributes.forEach(item => {
            item.ors = calculateReputationScore(maxSentimentScore, maxFollowers, maxTotalTweets, maxTotalLikes, maxTotalRT, item); // Fixed variable name
        });
        

        res.status(200).json(attributes);
    } catch (error) {
        console.error('Error fetching sentiment data:', error);
    }
};

// Function to calculate the sentiment score
function calculateSentimentScore(positive, negative) {
    const total = positive + negative;
    const positiveWeight = positive/total;
    const negativeWeight = negative/total;
  
    const score = (positiveWeight * 5) - (negativeWeight* 5) + 5;
    return Math.round(score);
}

function calculateReputationScore(maxSentimentScore, maxFollowers, maxTotalTweets, maxTotalLikes, maxTotalRT, item) {
    const normalizedSentimentScore = (item.sentimentScore / maxSentimentScore) * 50;
    const normalizedFollowers = (item.followers / maxFollowers) * 5;
    const normalizedTotalTweets = (item.totalTweets / maxTotalTweets) * 5;
    const normalizedTotalLikes = (item.totalLikes / maxTotalLikes) * 20;
    const normalizedTotalRT = (item.totalRT / maxTotalRT) * 20;

    const reputationScore = (normalizedSentimentScore + normalizedFollowers + normalizedTotalTweets + normalizedTotalLikes + normalizedTotalRT);

    return Math.round(reputationScore);
}