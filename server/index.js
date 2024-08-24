const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const SellerModel = require('./model/seller')
const userModel = require('./model/users')




const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/seller");


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
app.get("/user", (req,res)=>{
    // const {email, password} = req.body;
    userModel.find()
    .then(users => res.json(users))
    .catch(err =>res.json(err))
    })



// app.post('/register', (req, res)=>{
//     SellerModel.create(req.body)
//     .then(seller=>res.json(seller))
//     .catch(err=> res.json(err))
// })

app.listen(3000, ()=>{
    console.log("server is running! ")
})