const express = require('express');
const router = express.Router();
const reviewService = require('../service/ReviewService');


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

module.exports = router;