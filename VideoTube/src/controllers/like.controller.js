import mongoose from "mongoose";

import { Like } from "../models/like.model.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";


// VIDEO LIKE

const toggleVideoLike = asyncHandler(async (req, res) => {

    const { videoId } = req.params;

    const userId = req.user._id;


    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }


    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: userId
    });


    // If already liked → remove like
    if (existingLike) {

        await Like.findByIdAndDelete(existingLike._id);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        liked: false
                    },
                    "Video unliked successfully"
                )
            );
    }


    // If not liked → create like
    await Like.create({
        video: videoId,
        likedBy: userId
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    liked: true
                },
                "Video liked successfully"
            )
        );
});



// COMMENT LIKE

const toggleCommentLike = asyncHandler(async (req, res) => {

    const { commentId } = req.params;

    const userId = req.user._id;


    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }


    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: userId
    });


    // Already liked → unlike
    if (existingLike) {

        await Like.findByIdAndDelete(existingLike._id);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        liked: false
                    },
                    "Comment unliked successfully"
                )
            );
    }


    // Not liked → like
    await Like.create({
        comment: commentId,
        likedBy: userId
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    liked: true
                },
                "Comment liked successfully"
            )
        );
});



// TWEET LIKE

const toggleTweetLike = asyncHandler(async (req, res) => {

    const { tweetId } = req.params;

    const userId = req.user._id;


    if (!mongoose.Types.ObjectId.isValid(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }


    const existingLike = await Like.findOne({
        tweet: tweetId,
        likedBy: userId
    });


    // Already liked → unlike
    if (existingLike) {

        await Like.findByIdAndDelete(existingLike._id);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        liked: false
                    },
                    "Tweet unliked successfully"
                )
            );
    }


    // Not liked → like
    await Like.create({
        tweet: tweetId,
        likedBy: userId
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    liked: true
                },
                "Tweet liked successfully"
            )
        );
});


// GET VIDEO LIKE COUNT


const getVideoLikeCount = asyncHandler(async (req, res) => {

    const { videoId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }


    const likeCount = await Like.countDocuments({
        video: videoId
    });


    const isLiked = await Like.exists({
        video: videoId,
        likedBy: req.user._id
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    likeCount,
                    isLiked: !!isLiked
                },
                "Video like details fetched successfully"
            )
        );
});



// GET COMMENT LIKE COUNT

const getCommentLikeCount = asyncHandler(async (req, res) => {

    const { commentId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }


    const likeCount = await Like.countDocuments({
        comment: commentId
    });


    const isLiked = await Like.exists({
        comment: commentId,
        likedBy: req.user._id
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    likeCount,
                    isLiked: !!isLiked
                },
                "Comment like details fetched successfully"
            )
        );
});


// ======================================================
// GET TWEET LIKE COUNT
// ======================================================

const getTweetLikeCount = asyncHandler(async (req, res) => {

    const { tweetId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }


    const likeCount = await Like.countDocuments({
        tweet: tweetId
    });


    const isLiked = await Like.exists({
        tweet: tweetId,
        likedBy: req.user._id
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    likeCount,
                    isLiked: !!isLiked
                },
                "Tweet like details fetched successfully"
            )
        );
});


export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getVideoLikeCount,
    getCommentLikeCount,
    getTweetLikeCount
};