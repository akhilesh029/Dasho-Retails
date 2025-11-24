const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// ==========================================
// GET ALL ORDERS
// ==========================================
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ==========================================
// CANCEL ENTIRE ORDER
// ==========================================
router.delete("/orders/cancel/:id", async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

module.exports = router;
