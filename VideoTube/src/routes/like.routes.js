import { Router } from "express";

import {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getVideoLikeCount,
    getCommentLikeCount,
    getTweetLikeCount
} from "../controllers/like.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


// All like routes require authentication
router.use(verifyJWT);


// Video likes
router.route("/video/:videoId").post(toggleVideoLike);
router.route("/video/:videoId").get(getVideoLikeCount);


// Comment likes
router.route("/comment/:commentId").post(toggleCommentLike);
router.route("/comment/:commentId").get(getCommentLikeCount);


// Tweet likes
router.route("/tweet/:tweetId").post(toggleTweetLike);
router.route("/tweet/:tweetId").get(getTweetLikeCount);


export default router;