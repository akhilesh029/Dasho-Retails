const express = require('express');
const router = express.Router();
const BusinessformModel = require('../models/businessform'); // Update with the correct path to the model

// Add shop to trending
router.post('/shops/:shopId/addTrending', async (req, res) => {
    try {
        const { shopId } = req.params;
        console.log(shopId)

        // Find the shop and update its trending status
        const shop = await BusinessformModel.findByIdAndUpdate(
            shopId,
            { isTrending: true },
            { new: true } // Return the updated document
        );

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        res.status(200).json({ message: 'Shop added to trending', shop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add shop to trending', error });
    }
});

// Remove shop from trending
router.post('/shops/:shopId/removeTrending', async (req, res) => {
    try {
        const { shopId } = req.params;

        // Find the shop and update its trending status
        const shop = await BusinessformModel.findByIdAndUpdate(
            shopId,
            { isTrending: false },
            { new: true } // Return the updated document
        );

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        res.status(200).json({ message: 'Shop removed from trending', shop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to remove shop from trending', error });
    }
});

// Get all shops
router.get('/shops', async (req, res) => {
    try {
        const shops = await BusinessformModel.find();
        res.status(200).json(shops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch shops', error });
    }
});

module.exports = router;
