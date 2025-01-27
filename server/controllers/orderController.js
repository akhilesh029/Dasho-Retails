// controllers/orderController.js
const Order = require('../models/Order');

// 1. Get all orders for the authenticated seller
const getOrdersForSeller = async (req, res) => {
  try {
    console.log(req.body)
    const orders = await Order.find({ sellerId: req.sellerId })
      // .populate('customerId', 'name email')
      .exec();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// 2. Update the status of an order
// 2. Update the status of an item in an order
const updateOrderStatus = async (req, res) => {
  const { orderId, itemId } = req.params; // Extract orderId and itemId from the request parameters
  const { status } = req.body;

  const allowedStatuses = ["Pending", "Shipped", "Cancelled", "Delivered"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Find the specific item in the order
    const item = order.items.find((item) => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found in the order" });
    }

    // Check if the authenticated seller owns this item
    if (item.sellerId !== req.sellerId) {
      return res.status(403).json({ error: "You are not authorized to update this item's status" });
    }

    // Update the status of the item
    item.status = status;

    // Save the updated order
    await order.save();

    res.json({ message: "Item status updated successfully", order });
  } catch (error) {
    console.error("Error updating item status:", error);
    res.status(500).json({ error: "Failed to update item status" });
  }
};

module.exports = {
  getOrdersForSeller,
  updateOrderStatus,
};
