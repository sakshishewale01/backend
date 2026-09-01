import mongoose from "mongoose";

import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const uploadVideo = asyncHandler(async (req, res) => {

    const { title, description } = req.body;

    if (!title?.trim()) {
        throw new ApiError(400, "Video title is required");
    }

    if (!description?.trim()) {
        throw new ApiError(400, "Video description is required");
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required");
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required");
    }

    const videoFile = await uploadOnCloudinary(videoLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!videoFile) {
        throw new ApiError(400, "Error while uploading video");
    }

    if (!thumbnail) {
        throw new ApiError(400, "Error while uploading thumbnail");
    }

    const video = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        title: title.trim(),
        description: description.trim(),
        owner: req.user._id,
        duration: videoFile.duration || 0
    });

    const createdVideo = await Video.findById(video._id)
        .populate("owner", "username fullName avatar");

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdVideo,
                "Video uploaded successfully"
            )
        );
});


const getAllVideos = asyncHandler(async (req, res) => {

    const {
        page = 1,
        limit = 10,
        query,
        sortBy = "createdAt",
        sortType = "desc",
        userId
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (pageNumber < 1 || limitNumber < 1) {
        throw new ApiError(400, "Invalid page or limit");
    }

    const match = {
        isPublished: true
    };

    if (query?.trim()) {
        match.$or = [
            {
                title: {
                    $regex: query,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: query,
                    $options: "i"
                }
            }
        ];
    }

    if (userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new ApiError(400, "Invalid user id");
        }

        match.owner = new mongoose.Types.ObjectId(userId);
    }

    const sort = {
        [sortBy]: sortType === "asc" ? 1 : -1
    };

    const videos = await Video.find(match)
        .populate("owner", "username fullName avatar")
        .sort(sort)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    const totalVideos = await Video.countDocuments(match);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    videos,
                    page: pageNumber,
                    limit: limitNumber,
                    totalVideos,
                    totalPages: Math.ceil(
                        totalVideos / limitNumber
                    )
                },
                "Videos fetched successfully"
            )
        );
});


const getVideoById = asyncHandler(async (req, res) => {

    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId)
        .populate("owner", "username fullName avatar");

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                video,
                "Video fetched successfully"
            )
        );
});


const updateVideo = asyncHandler(async (req, res) => {

    const { videoId } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (
        video.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to update this video"
        );
    }

    if (title !== undefined) {
        if (!title.trim()) {
            throw new ApiError(400, "Title cannot be empty");
        }

        video.title = title.trim();
    }

    if (description !== undefined) {
        if (!description.trim()) {
            throw new ApiError(
                400,
                "Description cannot be empty"
            );
        }

        video.description = description.trim();
    }

    const thumbnailLocalPath =
        req.file?.path;

    if (thumbnailLocalPath) {

        const thumbnail =
            await uploadOnCloudinary(
                thumbnailLocalPath
            );

        if (!thumbnail) {
            throw new ApiError(
                400,
                "Error while uploading thumbnail"
            );
        }

        video.thumbnail = thumbnail.url;
    }

    await video.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                video,
                "Video updated successfully"
            )
        );
});


const deleteVideo = asyncHandler(async (req, res) => {

    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (
        video.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to delete this video"
        );
    }

    await Video.findByIdAndDelete(videoId);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Video deleted successfully"
            )
        );
});


const togglePublishStatus = asyncHandler(async (req, res) => {

    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (
        video.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to change this video"
        );
    }

    video.isPublished = !video.isPublished;

    await video.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                video,
                video.isPublished
                    ? "Video published successfully"
                    : "Video unpublished successfully"
            )
        );
});


const incrementVideoViews = asyncHandler(async (req, res) => {

    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $inc: {
                views: 1
            }
        },
        {
            new: true
        }
    );

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    views: video.views
                },
                "Video view updated successfully"
            )
        );
});


export {
    uploadVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    incrementVideoViews
};