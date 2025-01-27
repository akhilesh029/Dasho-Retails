const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  customer: {
    customerId: {type: String, required: true},
    firstName: { type: String, required: true }, // Customer's first name
    lastName: { type: String, required: true }, // Customer's last name
    email: { type: String, required: true }, // Customer's email
    phoneNumber: { type: String, required: true }, // Customer's phone number
    address1: { type: String, required: true }, // Primary address
    address2: { type: String }, // Secondary address (optional)
    pinCode: { type: String, required: true }, // PIN/ZIP code
  },
  items: [
    {
      id: { type: String, required: true }, // Unique item ID
      itemImage: { type: String, required: true},
      productId: { type: String, required: true }, // Product ID
      itemName: { type: String, required: true }, // Item name
      itemPrice: { type: Number, required: true }, // Item price
      quantity: { type: Number, required: true }, // Quantity of the item
      status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Cancelled', 'Delivered'], // Product-specific statuses
        default: 'Pending', // Default status for each product
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true, // Total order amount
  },
  orderDate: {
    type: Date,
    default: Date.now, // Default to the current date
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
