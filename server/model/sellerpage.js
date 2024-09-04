const mongoose = require('mongoose')

const SellerpageSchema = new mongoose.Schema({
   
       itemName: String,
       itemDescription:String,
       itemPrice: Number,
            
       image: String,
       
        
    
})

const SellerPageModel = mongoose.model("sellerpage", SellerpageSchema)
module.exports = SellerPageModel;

