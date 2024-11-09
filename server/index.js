const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require('multer')
const path = require('path')
require('dotenv').config();
// const upload = multer({dest: 'uploads/'})
const mongodb  = require('mongodb');


const SellerModel = require('./model/seller')
const userModel = require('./model/users')
const SellerPageModel = require('./model/sellerpage')
const OrderModel = require('./model/orders')
const AlluserdetailsModel = require('./model/userdetails')




const app = express()
app.use(express.json())
app.use(cors())

// <<<<<<< HEAD
// mongoose.connect("mongodb://localhost:27017/seller");
// =======
app.use(express.static('public'));

// mongoURL for local connection
// const mongoURL = process.env.MONGODB_URL_LOCAL ;

// mongoose.connect("mongodb://localhost:27017/sellerpage");
// mongoose.connect("mongodb://localhost:27017/seller");

// to connect mongodb atlas
//mongoURL for global connection
const mongoURL = process.env.MONGODB_URL;
// const DB = 'mongodb+srv://akhilesheka0100:mpss205152@cluster0.ihgex.mongodb.net/'
// const DB = 'mongodb+srv://akhilesheka0100:mpss205152@cluster0.ihgex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(()=>{
    console.log('mongodb connected')
}).catch((err)=> console.log('no connectionnnn'))


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



//-------for geting productitems-------
app.get('/getImage', (req, res) => {
    SellerPageModel.find()
        .then(sellerpage => res.json(sellerpage))
        .catch(err => res.json(err))
})
// -------------for getting orders---------------
app.get('/order', (req, res) => {
    OrderModel.find()
        .then(orders => res.json(orders))
        .catch(err => res.json(err))
})


app.post("/sellerlogin", (req,res)=>{
    const {email, password} = req.body;
    SellerModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                //  res.json("Success")
                res.send("Success")

            }
            else{
                res.json("the password is incorrect")
            }
        }
        else{
            res.json("No record existed!")
        }
    })
})


// user
app.get("/user", (req, res) => {
    // const {email, password} = req.body;
    console.log("yes")
    AlluserdetailsModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

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
    const result = await SellerPageModel.deleteOne({_id: new mongodb.ObjectId(itemId) });
   
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
  app.post('/savedetails', upload.single('gstCertificate'), async (req, res) => {
    const { email, businessName, ownerName, contactNumber, businessContactNumber, gstNumber, hasGst } = req.body;
    const gstCertificatePath = req.file ? req.file.path : null;
  console.log(req.body)
//   console.log(req.body.email)
//   console.log(req.body.businessName)
  console.log(gstCertificatePath)
    try {
      const userDetail = new AlluserdetailsModel({
        email,
        businessName,
        ownerName,
        contactNumber,
        businessContactNumber,
        gstNumber,
        hasGst,
        gstCertificate: gstCertificatePath,
      });
  
      await userDetail.save();
      res.json({ message: 'User details saved successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error saving user details' });
    }
  });


// app.post('/register', async (req, res)=>{
// const {name, email, password}  = req.body;

app.post('/register', (req, res)=>{
    SellerModel.create(req.body)
    .then(seller=>res.json(seller))
    .catch(err=> res.json(err))
})

    // SellerModel.create(req.body)
    //   .then(seller=>res.json(seller))
    //   .catch(err=> res.json(err))

//------------------using collection on the basis of seller name---------

const PORT =  process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running! on  ${PORT}`)
})