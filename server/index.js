const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require('multer')
const path = require('path')
// const upload = multer({dest: 'uploads/'})

const SellerModel = require('./model/seller')
const userModel = require('./model/users')
const SellerPageModel = require('./model/sellerpage')



const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static('public'));

// mongoose.connect("mongodb://localhost:27017/sellerpage");
mongoose.connect("mongodb://localhost:27017/seller");


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

// image + details upload
app.post('/sellerpage', upload.single('file'), (req, res) => {

    // console.log(req.file)
    // console.log(req.file.filename)

    SellerPageModel.create({
        image: req.file.filename,
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice,
        itemDescription: req.body.itemDescription,
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
    userModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})



app.post('/register', (req, res)=>{
    SellerModel.create(req.body)
    
    .then(seller=>res.json(seller))
    .catch(err=> res.json(err))
})

app.listen(3000, () => {
    console.log("server is running! ")
})