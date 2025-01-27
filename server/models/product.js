const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  productId: String,
  itemName: String,
  itemPrice: Number,
  itemDescription: String,
  itemImage: String,
  sellerEmail: String,
  timeLimit: Number, // Time limit in hours or days
  timeUnit: { type: String, enum: ['hours', 'days'] },
  expiryDate: Date, // Expiry date calculated based on time limit
  isActive: { type: Boolean, default: true }, // Track if product is active or inactive
  productCount: { type: Number, default: 1 }, // Count of the product
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
