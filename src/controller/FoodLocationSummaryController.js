const express = require('express');
const router = express.Router();
const FLSummaryService = require('../service/FLSummaryService');
const FoodLocationSummary = require('../model/FoodLocationSummary');
const {withOracleDB} = require("../../appService");


/*
ENDPOINT: GET /api/foodlocationsummary/get-foodlocationsummary-info
BODY: foodLocationSummaryID
RETURNS ON SUCCESS: {success: boolean, data: [{ summaryID, averageRating, description }]}
 */
router.post('/get-foodlocationsummary-info', async (req, res) => {
    try {
        const result = await FLSummaryService.getFoodLocationSummaryInfo(req.body.foodLocationSummaryID);
        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Failed to get food location summary information: ' + req.body.getFoodLocationInfoWithSummaryID
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
