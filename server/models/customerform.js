const mongoose = require("mongoose");

// Define the customer schema
const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
  },
  phoneNumber: { 
    type: String, 
    required: true, 
    match: /^[0-9]{10}$/  // Ensures the phone number is exactly 10 digits
  },
  address1: { type: String, required: true },
  address2: { type: String, required: false },  // Make address2 optional
  pinCode: { 
    type: String, 
    required: true, 
    match: /^[0-9]{6}$/  // Ensures the pin code is exactly 6 digits
  },
});

// Create and export the customer model
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
