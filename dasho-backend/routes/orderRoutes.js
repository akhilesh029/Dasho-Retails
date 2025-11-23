// routes/orderRoutes.js
const express = require('express');
const authenticateSeller = require('../middleware/authenticateSeller');
const { getOrdersForSeller, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

// Route to fetch orders for the seller
router.get('/orders/seller', authenticateSeller, getOrdersForSeller);

// Route to update the status of an order
// router.patch('/orders/:orderId', authenticateSeller, updateOrderStatus);


// Update the status of an item in an order
router.patch('/orders/:orderId/items/:itemId/status', authenticateSeller, updateOrderStatus);

module.exports = router;
