import { Router } from "express";

import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment
} from "../controllers/comment.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


// All comment routes require authentication
router.use(verifyJWT);


// Get comments for a video
// Add a comment to a video
router.route("/:videoId")
    .get(getVideoComments)
    .post(addComment);


// Update a comment
// Delete a comment
router.route("/c/:commentId")
    .patch(updateComment)
    .delete(deleteComment);


export default router;