const express = require('express');
const router = express.Router();
const dishService = require('../service/DishService');
const Dish = require('../model/Dish');
const {withOracleDB} = require("../../appService");


/*
ENDPOINT: GET /api/dish/get-dish-info
BODY: name, address, postalCode, country
RETURNS ON SUCCESS: {success: boolean, data: [{ dishName, price, type, isHalal, isGlutenFree, isVegetarian }]}
 */
router.post('/get-dish-info', async (req, res) => {
    try {
        const result = await dishService.getDishInfo(req.body.name, req.body.address, req.body.postalCode, req.body.country);
        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Failed to get dishes matching food location: ' + req.body.name + req.body.address + req.body.postalCode + req.body.country,
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
