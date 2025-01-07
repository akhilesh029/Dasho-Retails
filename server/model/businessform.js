const mongoose = require('mongoose');

const userdetailsSchema = new mongoose.Schema({
  email: String,
  businessName: String,
  ownerName: String,
  contactNumber: Number,
  businessContactNumber: Number,
  gstNumber: String,
  hasGst: Boolean,
  gstCertificate: String,  // Path for GST Certificate
  shopCategory: String,
  shopImage: String,  // Path for Shop Image
});

const BusinessformModel = mongoose.model("businessform", userdetailsSchema);

// module.exports = AlluserdetailsModel;
module.exports = BusinessformModel;
