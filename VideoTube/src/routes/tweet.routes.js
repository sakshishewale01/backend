import { Router } from "express";

import {
    createTweet,
    getUserTweets,
    getTweetById,
    updateTweet,
    deleteTweet
} from "../controllers/tweet.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.use(verifyJWT);


router.route("/")
    .post(createTweet);


router.route("/user/:userId")
    .get(getUserTweets);


router.route("/:tweetId")
    .get(getTweetById)
    .patch(updateTweet)
    .delete(deleteTweet);


export default router;