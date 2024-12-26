const mongoose = require('mongoose');

const SellerpageSchema = new mongoose.Schema({
   
       itemName: String,
       itemDescription:String,
       itemPrice: Number,    
       image: String,
       sellerEmail: String,
       
        
    
})

module.exports = SellerPageModel;
