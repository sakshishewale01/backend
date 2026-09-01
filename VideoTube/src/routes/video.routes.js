import { Router } from "express";

import {
    uploadVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    incrementVideoViews
} from "../controllers/video.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();


// Public routes
router.route("/")
    .get(getAllVideos);


// Protected routes
router.use(verifyJWT);


// Upload video
router.route("/upload")
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1
            },
            {
                name: "thumbnail",
                maxCount: 1
            }
        ]),
        uploadVideo
    );


// Get, update and delete video
router.route("/:videoId")
    .get(getVideoById)
    .patch(
        upload.single("thumbnail"),
        updateVideo
    )
    .delete(deleteVideo);


// Publish / unpublish
router.route("/toggle/publish/:videoId")
    .patch(togglePublishStatus);


// Increase views
router.route("/views/:videoId")
    .patch(incrementVideoViews);


export default router;