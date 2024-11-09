const mongoose = require('mongoose')


// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
//     quantity: Number
//   });

const OrderSchema = new mongoose.Schema({
       selectedItems:Object,
       totalpay: Number,
       name:String,
  
})

const OrderModel = mongoose.model("orders", OrderSchema)
module.exports = OrderModel;

