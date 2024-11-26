const express = require('express');
const router = express.Router();
const photoService = require('../service/PhotoService');
const Photo = require('../model/Photo');
const { generateUUID } = require('../Helper');

/*
ENDPOINT: PUT /api/users/insert-photo
BODY: email, password
RETURNS: {success : boolean}
 */
router.put('/insert-photo', async (req, res) => {
    try {
        const photo = new Photo(
            generateUUID(),
            req.body.imageURL,
            0,
            req.body.description,
            req.body.photoTimestamp,
            req.body.reviewID,
            req.body.summaryID
        );
        const result = await photoService.insertPhoto(photo);
        if (!result) {
            return res.status(400).json({ success: false, error: 'Failed to insert photo' });
        }
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

router.post('/get-photos-from-user-of-food-type', async (req, res) => {
    try {
        const result = await photoService.getPhotosFromUserOfFoodType(req.body.userID, req.body.type);
        if (!result) {
            return res.status(404).json({
                success: false,
                error: `Failed to get photos from user ${req.body.user} of food type ${req.body.type}`,
            });
        }
        res.json({
            success: true,
            photos: result,
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

module.exports = router;