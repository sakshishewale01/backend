import mongoose from "mongoose";

import { Comment } from "../models/comment.model.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";


// Get all comments for a video
const getVideoComments = asyncHandler(async (req, res) => {

    const { videoId } = req.params;

    const { page = 1, limit = 10 } = req.query;


    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }


    const pageNumber = Number(page);
    const limitNumber = Number(limit);


    if (pageNumber < 1 || limitNumber < 1) {
        throw new ApiError(
            400,
            "Page and limit must be greater than 0"
        );
    }


    const pipeline = [
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },

        {
            $unwind: "$owner"
        },

        {
            $project: {
                content: 1,
                video: 1,
                createdAt: 1,
                updatedAt: 1,

                owner: {
                    _id: "$owner._id",
                    username: "$owner.username",
                    fullName: "$owner.fullName",
                    avatar: "$owner.avatar"
                }
            }
        },

        {
            $sort: {
                createdAt: -1
            }
        }
    ];


    const comments = await Comment.aggregatePaginate(
        Comment.aggregate(pipeline),
        {
            page: pageNumber,
            limit: limitNumber
        }
    );


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                comments,
                "Comments fetched successfully"
            )
        );
});


// Add a comment to a video
const addComment = asyncHandler(async (req, res) => {

    const { videoId } = req.params;

    const { content } = req.body;


    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }


    if (!content?.trim()) {
        throw new ApiError(
            400,
            "Comment content is required"
        );
    }


    const comment = await Comment.create({
        content: content.trim(),
        video: videoId,
        owner: req.user._id
    });


    const createdComment = await Comment.findById(comment._id)
        .populate(
            "owner",
            "username fullName avatar"
        );


    if (!createdComment) {
        throw new ApiError(
            500,
            "Something went wrong while adding comment"
        );
    }


    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdComment,
                "Comment added successfully"
            )
        );
});


// Update a comment
const updateComment = asyncHandler(async (req, res) => {

    const { commentId } = req.params;

    const { content } = req.body;


    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }


    if (!content?.trim()) {
        throw new ApiError(
            400,
            "Comment content is required"
        );
    }


    const comment = await Comment.findById(commentId);


    if (!comment) {
        throw new ApiError(
            404,
            "Comment not found"
        );
    }


    // Only the owner of the comment can update it
    if (
        comment.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to update this comment"
        );
    }


    comment.content = content.trim();

    await comment.save();


    const updatedComment = await Comment.findById(comment._id)
        .populate(
            "owner",
            "username fullName avatar"
        );


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedComment,
                "Comment updated successfully"
            )
        );
});


// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {

    const { commentId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }


    const comment = await Comment.findById(commentId);


    if (!comment) {
        throw new ApiError(
            404,
            "Comment not found"
        );
    }


    // Only the owner of the comment can delete it
    if (
        comment.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to delete this comment"
        );
    }


    await Comment.findByIdAndDelete(commentId);


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Comment deleted successfully"
            )
        );
});


export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
};