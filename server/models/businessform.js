const mongoose = require('mongoose');

const userdetailsSchema = new mongoose.Schema({
  sellerId: String,
  email:{type: String, required: true, unique: true}, 
  businessName: {type: String, required: true},
  ownerName: {type: String, required: true},
  contactNumber: Number,
  businessContactNumber: {type: Number, required: true},
  gstNumber: String,
  hasGst: Boolean,
  gstCertificate: String,  // Path for GST Certificate
  shopCategory: String,
  shopImage: String,  // Path for Shop Image
  isTrending: { type: Boolean, default: false }, // Tracks trending status
});

const BusinessformModel = mongoose.model("businessform", userdetailsSchema);


module.exports = BusinessformModel;
