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
    shopCategory: String,
   
    
})

const AlluserdetailsModel = mongoose.model("alluserdetails", userdetailsSchema)

module.exports = AlluserdetailsModel