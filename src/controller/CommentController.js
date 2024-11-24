const express = require('express');
const router = express.Router();
const commentService = require('../service/CommentService');



/*
ENDPOINT: GET /api/comment/get-users-comments
BODY: reviewID
RETURNS ON SUCCESS: {success: boolean, data: [{ commentLikes, commentContent, commentTimestamp, reviewID }]}
 */
router.post('/get-users-comments', async (req, res) => {
    try {
        const result = await commentService.getCommentReview(req.body.userID);
        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Failed to get comment with user ID ' + req.body.userID ,
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
