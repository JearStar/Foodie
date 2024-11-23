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

module.exports = router;