import React, { useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa"; // Keep some icons
import "./CustomerForm.css";

const CustomerForm = () => {
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/customer", customerDetails)
      .then((response) => {
        console.log("Data submitted successfully ", response.data);
        setCustomerDetails({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address1: "",
          address2: "",
          pinCode: "",
        });
      })
      .catch((err) => {
        console.log("Data not submitted!", err);
      });
  };

  return (
    <div className="customer-form-container">
      <div className="header-image">
        <h1 >Fill your form and Shop with us.  </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi cum iure facilis fugiat mollitia blanditiis? Alias a quae nobis veniam.</p>
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Customer Registration"
        />
      </div>
      <form onSubmit={handleSubmit} className="customer-form">
      <h2 className="form-title">Customer Details Form</h2>
        <div className="form-group">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="First Name"
            className="form-image"
          />
          <input
            type="text"
            name="firstName"
            value={customerDetails.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Last Name"
            className="form-image"
          />
          <input
            type="text"
            name="lastName"
            value={customerDetails.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <img
            src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
            alt="Email"
            className="form-image"
          />
          <input
            type="email"
            name="email"
            value={customerDetails.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <img
            src="https://cdn-icons-png.flaticon.com/512/455/455705.png"
            alt="Phone Number"
            className="form-image"
          />
          <input
            type="number"
            name="phoneNumber"
            value={customerDetails.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="form-group">
          <FaMapMarkerAlt className="form-icon" />
          <input
            type="text"
            name="address1"
            value={customerDetails.address1}
            onChange={handleChange}
            placeholder="Address Line 1"
            required
          />
        </div>
        <div className="form-group">
          <FaLocationArrow className="form-icon" />
          <input
            type="text"
            name="address2"
            value={customerDetails.address2}
            onChange={handleChange}
            placeholder="Address Line 2"
          />
        </div>
        <div className="form-group">
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="Pin Code"
            className="form-image"
          />
          <input
            type="number"
            name="pinCode"
            value={customerDetails.pinCode}
            onChange={handleChange}
            placeholder="Pin Code"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
