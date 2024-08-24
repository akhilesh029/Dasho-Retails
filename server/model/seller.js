const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const SellerModel = mongoose.model("seller", SellerSchema)
module.exports = SellerModel