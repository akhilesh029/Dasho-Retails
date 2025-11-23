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
const mongodb = require('mongodb');

const categoryRoutes = require('./routes/category');


const BusinessformModel = require('./models/businessform')
const Product = require('./models/product')

const trendinShopsRoutes = require('./routes/trendingshops');

const Customer = require('./models/customerform');
const Order = require('./models/Order')
  // Import the UUID library
const { v4: uuidv4 } = require('uuid');   // Import the UUID library to generate unique IDs
const jwt = require("jsonwebtoken");
const orderRoutes = require('./routes/orderRoutes')


const app = express()
app.use(express.json())

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true
}));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});


app.use(orderRoutes)
app.use('/api', trendinShopsRoutes);


// app.use(express.static('public'));
app.use('/public/', express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGODB_URL, {
}).then(() => {
  console.log('mongodb connected')
}).catch((err) => console.log('mongodb error'))


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


// Route to place an order
app.post('/orders', async (req, res) => {
  const { customer, items, totalAmount } = req.body;
  console.log(req.body);

  // Check if the required fields are provided
  if (!customer || !items || items.length === 0 || !totalAmount) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    // Create a new order
    const newOrder = new Order({
      customer,
      items,
      totalAmount,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with success message and the saved order data
    res.status(201).json({
      message: 'Order placed successfully.',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order.' });
  }
});


// app.use("/api/categories",categoryRoutes)

//------------- upload product by seller with time limit------------------

app.post("/uploadProduct", upload.single("file"), async (req, res) => {
  const {id, itemName, itemPrice, itemDescription, sellerEmail, productCount, timeLimit, timeUnit } = req.body;
  const itemImage = req.file ? req.file.path : null;

  

  // Validate input
  if (!id || !itemName || !itemPrice || !itemDescription || !sellerEmail || !productCount || !timeLimit || !timeUnit) {
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

  const productId = `prod_${itemName}_Date(${Date.now()})`; // Unique product ID
  console.log(`Generated productId: ${productId}`);

  console.log("Product Details:", req.body);
 
  // Create a new product
  const newProduct = new Product({
    id,
    productId,
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


// API route to get products for a specific seller
app.get('/sellers/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Find all products for the seller
    const products = await Product.find({ sellerEmail: email });

    // Return the products for the seller
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products. Please try again later.' });
  }
});

// API route to get particular shopDetails
app.get('/shops/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Find all products for the seller
    const shopDetails = await BusinessformModel.find({ email: email });

    // Return the products for the seller
    res.json(shopDetails);
  } catch (err) {
    console.error('Error fetching shopDetails:', err);
    res.status(500).json({ error: 'Failed to fetch shopDetails. Please try again later.' });
  }
});



// ----------------------fetching shopCategories----------------------
app.get('/api/categories', (req, res) => {
  BusinessformModel.find()
    .then(shopcategory => res.json(shopcategory))
    .catch(err => res.json(err))
})


// -------------fetching all shops-----------------------
app.get('/api/shops', (req, res) => {
  BusinessformModel.find()
    .then(allshop => res.json(allshop))
    .catch(err => res.json(err))
})

//----------------fetching trending shops to on slider---------
app.get('/api/shops/trending', (req, res) => {
  BusinessformModel.find()
    .then(allshop => res.json(allshop))
    .catch(err => res.json(err))
})


//-------for geting productitems and data-------
app.get('/showproduct', (req, res) => {
  Product.find()
    .then(sellerpage => res.json(sellerpage))
    .catch(err => res.json(err))
})

//---------------fetching products for admin pannel--------------
app.get('/api/products', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.json(err))
})







// API endpoint to get customer details by email
app.get("/seller", (req, res) => {
  const { email } = req.query; // Get the email from the query parameters
  console.log(email)

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required" });
  }

  // Find customer by email
  BusinessformModel.findOne({ email })
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(customer);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error retrieving customer details", details: err });
    });
});

// Route to fetch customer details by email
app.get("/customer", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    console.error("Error fetching customer details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/customer", (req, res) => {
  const { firstName, lastName, email, phoneNumber, address1, address2, pinCode } = req.body;

  const newCustomer = new Customer({
    firstName,
    lastName,
    email,
    phoneNumber,
    address1,
    address2,
    pinCode,
  });

  newCustomer
    .save()
    .then((customer) => {
      res.status(201).json({ message: "Customer details saved", customer });
    })
    .catch((err) => {
      console.error("Error saving customer details:", err);  // Log the error here
      res.status(500).json({ error: "Error saving customer details", details: err.message });
    });
});





// Route to fetch customer details
app.get("/customer/details", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Decode the token to get the email (Google tokens usually contain the email)
    const decoded = jwt.decode(token); // Or verify with jwt.verify if using your own secret
    const customerEmail = decoded.email; // Assuming the token contains the email

    // Fetch the customer from the database using the email
    const customer = await Customer.findOne({ email: customerEmail });
    console.log("Customer:", customer);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
     console.log("this is customer: ",customer)
    res.json(customer);
    // res.json({ customerId: customer._id, email: customer.email });
  } catch (error) {
    console.error("Error fetching customer details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




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




// DELETE route to delete data
app.delete('/delete/:id', async (req, res) => {
  const itemId = req.params.id;
  // console.log(itemId)
  const result = await Product.deleteOne({ _id: new mongodb.ObjectId(itemId) });

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



// Generate a unique sellerId
const sellerId = uuidv4();
console.log(`Generated sellerId: ${sellerId}`);


  try {
    const userDetail = new BusinessformModel({
      sellerId,
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








// const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
//   console.log(`server is running! on  ${PORT}`)
// })

const PORT = process.env.PORT || 3000;

// Only listen locally, not on Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`server is running! on ${PORT}`);
  });
}

// ✅ Export app for Vercel
module.exports = app;
