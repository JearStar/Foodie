const express = require('express');
const router = express.Router();
const foodLocationService = require('../service/FoodLocationService');
const FoodLocation = require('../model/FoodLocation');
const FoodLocationSummary = require('../model/FoodLocationSummary');
const { generateUUID } = require('../Helper');

/*
ENDPOINT: POST /api/users/create-location
BODY: { foodLocationName, address, postalCode, country, city, genre, description
RETURNS: {success : boolean}
 */
router.post('/create-location', async (req, res) => {
    try {
        const newUUID = generateUUID();
        const foodLocation = new FoodLocation(
            req.body.foodLocationName,
            req.body.address,
            req.body.postalCode,
            req.body.country,
            0,
            0,
            req.body.city,
            req.body.genre,
            newUUID
        );
        const foodLocationSummary = new FoodLocationSummary(
            newUUID,
            0,
            req.body.description,
            req.body.foodLocationName,
            req.body.address,
            req.body.postalCode,
            req.body.country
        );
        console.log(req.body);
        const locationResult = await foodLocationService.insertFoodLocation(foodLocation, foodLocationSummary);
        if (!locationResult) {
            return res.status(400).json({ success: false, error: 'Failed to insert foodLocation' });
        }
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

/*
ENDPOINT: GET /api/foodlocation/get-foodlocation-info
BODY: foodLocationSummaryID
RETURNS ON SUCCESS: {success: boolean, data: [{ userID, email, password, numReviews }]}
 */
router.post('/get-foodlocation-info', async (req, res) => {
    try {
        const result = await foodLocationService.getFoodLocationInfoWithSummaryID(req.body.FoodLocationSummaryID);
        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Failed to get food location information: ' + req.body.getFoodLocationInfoWithSummaryID,
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

router.post('/findLocs', async (req, res) => {
    try {
        const searchKey = req.body["search"];
        const result1 = await foodLocationService.searchLocs(searchKey);
        const result2 = await flSummaryService.searchSummaries(searchKey);
        if (!result1 || !result2) {
            return res.status(400).json({ success: false, error: 'Internal database error' });
        }
        res.json({ success: true, FoodLocations: result1, FoodLocationSummaries: result2 });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});


module.exports = router;