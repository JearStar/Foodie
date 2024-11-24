const express = require('express');
const router = express.Router();
const reviewService = require('../service/ReviewService');
const dishService = require("../service/DishService");


router.post('/getReviewInfo', async (req, res) => {
  try {
    const searchKey = req.body["id"];
    const result = await reviewService.searchRevs(searchKey);
    if (!result) {
      return res.status(400).json({ success: false, error: 'Internal database error' });
    }
    res.json({ success: true, reviewInfo: result});
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

router.post('/getDishReviews', async (req, res) => {
  try {
    const searchKey = req.body["id"];
    const result = await reviewService.searchDishRevs(searchKey);
    if (!result) {
      return res.status(400).json({ success: false, error: 'Internal database error' });
    }
    res.json({ success: true, dishReviews: result});
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});


/*
ENDPOINT: GET /api/review/get-user-reviews
BODY: userID
RETURNS ON SUCCESS: {success: boolean, data: [{ reviewID, overallRating, serviceRating, waitTimeRating, dayVisited, timestamp, locationName, locationAddress, locationPostalCode, locationCountry }]}
 */
router.post('/get-user-reviews', async (req, res) => {
  try {
    const result = await reviewService.getUserReviews(req.body.userID);
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Failed to get user reviews from: ' + req.body.userID,
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