const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require('multer')
const path = require('path')
// const moment = require("moment");
const moment = require("moment-timezone");
const cron = require('node-cron');  //it schedules job to check expiryDate of product
require('dotenv').config();
// const upload = multer({dest: 'uploads/'})
const mongodb  = require('mongodb');

const categoryRoutes = require('./routes/category');

const SellerPageModel = require('./model/sellerpage')
const OrderModel = require('./model/orders')
const BusinessformModel = require('./model/businessform')
const Product = require('./model/product')




const app = express()
app.use(express.json())
app.use(cors())

// <<<<<<< HEAD
// mongoose.connect("mongodb://localhost:27017/seller");
// =======
// app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));


// mongoURL for local connection
// const mongoURL = process.env.MONGODB_URL_LOCAL ;

// mongoose.connect("mongodb://localhost:27017/sellerpage");
// mongoose.connect("mongodb://localhost:27017/seller");

// to connect mongodb atlas
//mongoURL for global connection
// const mongoURL = process.env.MONGODB_URL;
// const DB = 'mongodb+srv://akhilesheka0100:mpss205152@cluster0.ihgex.mongodb.net/'
const mongoURL = 'mongodb+srv://akhilesheka0100:mpss205152@cluster0.ihgex.mongodb.net/dasho?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongoURL, {
}).then(()=>{
    console.log('mongodb connected')
}).catch((err)=> console.log('mongodb error'))


//================================================= Multer =======================================================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})




//------------- upload product by seller with time limit------------------

app.post("/uploadProduct", upload.single("file"), async (req, res) => {
  const { itemName, itemPrice, itemDescription,sellerEmail,productCount, timeLimit, timeUnit } = req.body;
  const itemImage = req.file ? req.file.path : null;

  // Validate input
  if (!itemName || !itemPrice || !itemDescription || !sellerEmail || !productCount || !timeLimit || !timeUnit) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!["hours", "days"].includes(timeUnit)) {
    return res.status(400).json({ error: "Invalid time unit. Use 'hours' or 'days'." });
  }

  if (!itemImage) {
    return res.status(400).json({ error: "Item image is required." });
  }

// Calculate expiry date using native Date

let expiryDate;
try {
    // Calculate expiry date in IST
    if (timeUnit === "hours") {
        expiryDate = moment().tz('Asia/Kolkata').add(Number(timeLimit), "hours").format("YYYY-MM-DDTHH:mm:ssZ"); // ISO format with IST offset
    } else if (timeUnit === "days") {
        expiryDate = moment().tz('Asia/Kolkata').add(Number(timeLimit), "days").format("YYYY-MM-DDTHH:mm:ssZ"); // ISO format with IST offset
    } else {
        throw new Error("Invalid timeUnit provided. Use 'hours' or 'days'.");
    }

    // console.log('Expiry Date in IST:', expiryDate);
} catch (error) {
    console.error('Error calculating expiry date:', error.message);
}


  // Create a new product
  const newProduct = new Product({
    itemName,
    itemPrice,
    itemDescription,
    itemImage,
    sellerEmail,
    productCount,
    timeLimit: Number(timeLimit),
    timeUnit,
    expiryDate,
    isActive: true, // Product is active initially
  });

  try {
    await newProduct.save();
    res.json({ message: "Product uploaded successfully", product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error uploading product" });
  }
});

//==========================================================================

// Schedule a job to run every hour (you can adjust the frequency as needed)
cron.schedule('*/2 * * * *', async () => {
  try {
    const currentDate = moment().tz('Asia/Kolkata').toDate(); // Get current time in IST

    // Find products whose expiry date has passed and set isActive to false
    const updatedProducts = await Product.updateMany(
      { expiryDate: { $lt: currentDate }, isActive: true }, // Expired products
      { $set: { isActive: false } } // Set isActive to false
    );

    console.log(`${updatedProducts.nModified} expired products deactivated`);
  } catch (error) {
    console.error('Error deactivating expired products:', error.message);
  }
});


//====================================fetching Inactive products=====================
app.get("/inactiveProducts/:sellerEmail", async (req, res) => {
  const { sellerEmail } = req.params;

  try {
    // Fetch inactive products for the seller
    const inactiveProducts = await Product.find({
      sellerEmail,
      isActive: false, // Only fetch inactive products
    }).exec();

    if (inactiveProducts.length === 0) {
      return res.status(404).json({ message: "No inactive products found." });
    }

    res.json({ inactiveProducts });
  } catch (error) {
    console.error("Error fetching inactive products:", error.message);
    res.status(500).json({ error: "Error fetching inactive products." });
  }
});

//===============================API to Reactivate Products===========================
app.put("/reactivateProduct/:productId", async (req, res) => {
  const { productId } = req.params;
  const { timeLimit, timeUnit } = req.body;

  // Validate input
  if (!timeLimit || !timeUnit || !["hours", "days"].includes(timeUnit)) {
    return res.status(400).json({ error: "Invalid time limit or time unit." });
  }

  try {
    // Calculate new expiry date
    let newExpiryDate;
    if (timeUnit === "hours") {
      newExpiryDate = moment().tz("Asia/Kolkata").add(Number(timeLimit), "hours").format("YYYY-MM-DDTHH:mm:ssZ");
    } else if (timeUnit === "days") {
      newExpiryDate = moment().tz("Asia/Kolkata").add(Number(timeLimit), "days").format("YYYY-MM-DDTHH:mm:ssZ");
    }

    // Update the product's expiry date and isActive status
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          expiryDate: newExpiryDate,
          isActive: true, // Reactivate the product
          timeLimit: Number(timeLimit), // Update timeLimit
          timeUnit, // Update timeUnit
        },
      },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({ message: "Product reactivated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error reactivating product:", error.message);
    res.status(500).json({ error: "Error reactivating product." });
  }
});




//========================================================= image + details upload  ========================================
app.post('/sellerpage', upload.single('file'), (req, res) => {

    SellerPageModel.create({
        image: req.file.filename,
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice,
        itemDescription: req.body.itemDescription,
        sellerEmail: req.body.sellerEmail,
        // file: req.file.filename,  

    })
        .then(Sellerpage => res.json(Sellerpage))
        .catch(err => res.json(err))

});



//-------for geting productitems and data-------
app.get('/showproduct', (req, res) => {
    Product.find()
        .then(sellerpage => res.json(sellerpage))
        .catch(err => res.json(err))
})


// -------------for getting orders---------------
app.get('/order', (req, res) => {
    OrderModel.find()
        .then(orders => res.json(orders))
        .catch(err => res.json(err))
})



// user
app.get("/user", (req, res) => {
    // const {email, password} = req.body;
    BusinessformModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
// app.get("/api/user", (req, res) => {
//     // const {email, password} = req.body;
//     BusinessformModel.find()
//         .then(users => res.json(users))
//         .catch(err => res.json(err))
// })

// fetching shopcategory
app.get("/api/shopcategory", (req, res) => {
    // Querying shop categories from the model (assuming shopCategory is a field in the model)
    BusinessformModel.find({}, 'shopCategory') // Fetch only the shopCategory field
        .then(shopcategories => {
            // Extract unique shop categories (if needed)
            const uniqueCategories = [...new Set(shopcategories.map(item => item.shopCategory))];
            res.json(uniqueCategories);
        })
        .catch(err => res.status(500).json({ message: "Error fetching shop categories", error: err }));
});


app.post('/orders', (req, res)=>{
    OrderModel.create({
       selectedItems:req.body.selectedItems,
       totalpay: req.body.totalpay,
        name: req.body.name, 

    })
    .then(orders=>res.json(orders))
    .catch(err=> res.json(err))
})

// DELETE route to delete data
app.delete('/delete/:id', async (req, res) => {
    const itemId = req.params.id;
    // console.log(itemId)
    const result = await Product.deleteOne({_id: new mongodb.ObjectId(itemId) });
   
    try {
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Data deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    }
     catch (err) {
      res.status(500).json({ error: 'Error deleting data' });
    }
  });


// Handle POST request for form submission
app.post('/businessform', upload.fields([
    { name: 'gstCertificate', maxCount: 1 },
    { name: 'shopImage', maxCount: 1 }
  ]), async (req, res) => {
    const { email, businessName, ownerName, contactNumber, businessContactNumber, gstNumber, hasGst, shopCategory } = req.body;
  
    // Get the file paths for gstCertificate and shopImage
    const gstCertificatePath = req.files && req.files['gstCertificate'] ? req.files['gstCertificate'][0].path : null;
    const shopImagePath = req.files && req.files['shopImage'] ? req.files['shopImage'][0].path : null;
  
    console.log("GST Certificate Path:", gstCertificatePath);
    console.log("Shop Image Path:", shopImagePath);
  
    try {
      const userDetail = new BusinessformModel({
        email,
        businessName,
        ownerName,
        contactNumber,
        businessContactNumber,
        gstNumber,
        hasGst,
        gstCertificate: gstCertificatePath,
        shopCategory,
        shopImage: shopImagePath, // Save the shop image path
      });
  
      await userDetail.save();
      res.json({ message: 'User details saved successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error saving user details' });
    }
  });
  







const PORT =  process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running! on  ${PORT}`)
})