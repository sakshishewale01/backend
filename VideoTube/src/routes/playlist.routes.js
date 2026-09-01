import { Router } from "express";

import {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist
} from "../controllers/playlist.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


router.use(verifyJWT);


// Create playlist
router.route("/")
    .post(createPlaylist);


// Get all playlists of a user
router.route("/user/:userId")
    .get(getUserPlaylists);


// Get, update and delete a specific playlist
router.route("/:playlistId")
    .get(getPlaylistById)
    .patch(updatePlaylist)
    .delete(deletePlaylist);


// Add video to playlist
router.route("/:playlistId/video/:videoId")
    .post(addVideoToPlaylist);


// Remove video from playlist
router.route("/:playlistId/video/:videoId")
    .delete(removeVideoFromPlaylist);


export default router;