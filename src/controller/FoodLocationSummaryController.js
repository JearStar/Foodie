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
                error: 'Failed to get food location summary information: ' + req.body.foodLocationSummaryID
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

router.post('/get-foodlocationsummary-obj', async (req, res) => {
    try {
        const name = req.body["flName"];
        const address = req.body["address"];
        const postal = req.body["postalCode"];
        const country = req.body["country"];
        const result = await FLSummaryService.searchSummaries(name, address, postal, country);
        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Failed to get food location summary information'
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

/*
ENDPOINT: GET /api/foodlocationsummary/get-popular-summaries
BODY: foodLocationSummaryID
RETURNS ON SUCCESS: {success: boolean, data: [{ summaryID, averageRating, description }]}
 */
router.post('/get-popular-summaries', async (req, res) => {
    try {
        const result = await FLSummaryService.getTrendingSummaries();
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
