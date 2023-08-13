import express from "express";
import {getTweets, getTweetsById, getTopTweets, getEngagementRate, getEngagementByUser} from "../controllers/TweetsController.js";

const router = express.Router();

router.get('/tweets', getTweets);
router.get('/tweets/:id', getTweetsById);
router.get('/top-tweets', getTopTweets);
router.get('/engagement-rate', getEngagementRate);
router.get('/likesrt', getEngagementByUser)


// router.post('/users', createUser);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;