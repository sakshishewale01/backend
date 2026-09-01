import mongoose from "mongoose";

import { Playlist } from "../models/playlist.model.js";
import { Video } from "../models/video.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// ======================================================
// CREATE PLAYLIST
// ======================================================

const createPlaylist = asyncHandler(async (req, res) => {

    const { name, description } = req.body;


    if (!name?.trim()) {
        throw new ApiError(400, "Playlist name is required");
    }


    if (!description?.trim()) {
        throw new ApiError(400, "Playlist description is required");
    }


    const playlist = await Playlist.create({
        name: name.trim(),
        description: description.trim(),
        owner: req.user._id,
        videos: []
    });


    const createdPlaylist = await Playlist.findById(
        playlist._id
    ).populate(
        "owner",
        "username fullName avatar"
    );


    if (!createdPlaylist) {
        throw new ApiError(
            500,
            "Something went wrong while creating playlist"
        );
    }


    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdPlaylist,
                "Playlist created successfully"
            )
        );
});


// ======================================================
// GET USER PLAYLISTS
// ======================================================

const getUserPlaylists = asyncHandler(async (req, res) => {

    const { userId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user id");
    }


    const playlists = await Playlist.find({
        owner: userId
    })
    .populate(
        "owner",
        "username fullName avatar"
    )
    .sort({
        createdAt: -1
    });


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                playlists,
                "User playlists fetched successfully"
            )
        );
});


// ======================================================
// GET SINGLE PLAYLIST
// ======================================================

const getPlaylistById = asyncHandler(async (req, res) => {

    const { playlistId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }


    const playlist = await Playlist.findById(
        playlistId
    )
    .populate(
        "owner",
        "username fullName avatar"
    )
    .populate(
        "videos"
    );


    if (!playlist) {
        throw new ApiError(
            404,
            "Playlist not found"
        );
    }


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                playlist,
                "Playlist fetched successfully"
            )
        );
});


// ======================================================
// UPDATE PLAYLIST
// ======================================================

const updatePlaylist = asyncHandler(async (req, res) => {

    const { playlistId } = req.params;

    const { name, description } = req.body;


    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }


    if (!name?.trim()) {
        throw new ApiError(
            400,
            "Playlist name is required"
        );
    }


    if (!description?.trim()) {
        throw new ApiError(
            400,
            "Playlist description is required"
        );
    }


    const playlist = await Playlist.findById(
        playlistId
    );


    if (!playlist) {
        throw new ApiError(
            404,
            "Playlist not found"
        );
    }


    // Only playlist owner can update it
    if (
        playlist.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to update this playlist"
        );
    }


    playlist.name = name.trim();
    playlist.description = description.trim();


    await playlist.save();


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                playlist,
                "Playlist updated successfully"
            )
        );
});


// ======================================================
// DELETE PLAYLIST
// ======================================================

const deletePlaylist = asyncHandler(async (req, res) => {

    const { playlistId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }


    const playlist = await Playlist.findById(
        playlistId
    );


    if (!playlist) {
        throw new ApiError(
            404,
            "Playlist not found"
        );
    }


    // Only playlist owner can delete it
    if (
        playlist.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to delete this playlist"
        );
    }


    await Playlist.findByIdAndDelete(
        playlistId
    );


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Playlist deleted successfully"
            )
        );
});


// ======================================================
// ADD VIDEO TO PLAYLIST
// ======================================================

const addVideoToPlaylist = asyncHandler(async (req, res) => {

    const { playlistId, videoId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }


    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }


    const playlist = await Playlist.findById(
        playlistId
    );


    if (!playlist) {
        throw new ApiError(
            404,
            "Playlist not found"
        );
    }


    // Only playlist owner can add videos
    if (
        playlist.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to modify this playlist"
        );
    }


    const video = await Video.findById(videoId);


    if (!video) {
        throw new ApiError(
            404,
            "Video not found"
        );
    }


    // Check if video is already present
    if (
        playlist.videos.some(
            (id) => id.toString() === videoId.toString()
        )
    ) {
        throw new ApiError(
            409,
            "Video already exists in playlist"
        );
    }


    playlist.videos.push(videoId);


    await playlist.save();


    const updatedPlaylist = await Playlist.findById(
        playlistId
    )
    .populate(
        "videos"
    );


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedPlaylist,
                "Video added to playlist successfully"
            )
        );
});


// ======================================================
// REMOVE VIDEO FROM PLAYLIST
// ======================================================

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {

    const { playlistId, videoId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }


    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }


    const playlist = await Playlist.findById(
        playlistId
    );


    if (!playlist) {
        throw new ApiError(
            404,
            "Playlist not found"
        );
    }


    // Only playlist owner can remove videos
    if (
        playlist.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to modify this playlist"
        );
    }


    const videoExists = playlist.videos.some(
        (id) => id.toString() === videoId.toString()
    );


    if (!videoExists) {
        throw new ApiError(
            404,
            "Video is not present in playlist"
        );
    }


    playlist.videos = playlist.videos.filter(
        (id) => id.toString() !== videoId.toString()
    );


    await playlist.save();


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                playlist,
                "Video removed from playlist successfully"
            )
        );
});


export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist
};