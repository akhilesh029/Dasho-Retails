const mongoose = require('mongoose');

const userdetailsSchema = new mongoose.Schema({
    email: String,
    businessName: String,
    poster: String,
    category:String,
    ownerName: String,
    contactNumber: Number,
    businessContactNumber: Number,
    gstNumber: String,
    hasGst: Boolean,
    gstCertificate: String,
    uploadedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "sellerpage" // Reference to the SellerPageModel
        }
    ]
});

const AlluserdetailsModel = mongoose.model("alluserdetails", userdetailsSchema);

module.exports = AlluserdetailsModel;
