const express = require('express');
const router = express.Router();
const foodLocationService = require('../service/FoodLocationService');
const FoodLocation = require('../model/FoodLocation');
const {withOracleDB} = require("../../appService");
const userService = require("../service/UserService");

/*
ENDPOINT: PUT /api/foodlocation/create-foodlocation
BODY: genre, country, address, name, city, postalCode
RETURNS: {success : boolean}
 */
router.put('/create-foodlocation', async (req, res) => {
    try {
        const foodLocation = new FoodLocation(req.body.name, null, req.body.address, req.body.city, req.body.postalCode, req.body.country, req.body.genre, null);
        const result = await foodLocationService.insertFoodLocation(foodLocation);
        if (!result) {
            return res.status(400).json({ success: false, error: 'Failed to create food location' });
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


module.exports = router;
