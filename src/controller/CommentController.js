const express = require('express');
const router = express.Router();
const Comment = require('../model/Comment');
const { generateUUID } = require('../Helper');
const commentService = require("../service/CommentService");

/*
ENDPOINT: GET /api/comments/get-user-comments
BODY: userID
RETURNS : {success: boolean, data: [{ "commentID", "commentLikes", "content", "contentTimestamp", "reviewID", "parentCommentID", "userID"}]}
 */
router.post('/get-user-comments', async (req, res) => {
    try {
        const result = await commentService.getCommentsFromUser(req.body.userID);
        if (!result) {
            return res.status(404).json({
                success: false,
                error: `Failed to get comments from user: ${req.body.userID}`,
            });
        }
        res.json({
            success: true,
            data: result,
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

router.post('/get-replies', async (req, res) => {
    try {
        const result = await commentService.getReplies(req.body.commentID);
        if (!result) {
            return res.status(404).json({
                success: false,
                error: `Failed to get comments replies to comment: ${req.body.commentID}`,
            });
        }
        res.json({
            success: true,
            data: result,
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

module.exports = router;