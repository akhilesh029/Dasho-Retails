const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:Number
})

const UserModel = mongoose.model("sellers", userSchema)

module.exports = UserModel