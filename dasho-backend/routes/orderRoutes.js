const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// GET ALL ORDERS
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// PLACE ORDER
router.post("/orders", async (req, res) => {
  const { customer, items, totalAmount } = req.body;

  if (!customer || !items || items.length === 0 || !totalAmount) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newOrder = await new Order({ customer, items, totalAmount }).save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// CANCEL ORDER
router.delete("/orders/cancel/:id", async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

module.exports = router;
