import React, { useState } from "react";
import axios from "axios";
import "./BusinessForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBuilding,
  FaPhone,
  FaFileAlt,
  FaCertificate,
} from "react-icons/fa";

function BusinessForm() {
  const location = useLocation();
  const navigate = useNavigate();

  // FIXED — get email safely
  const email = location.state?.email || location.state || "";
  console.log("BusinessForm Email:", email);

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [businessContactNumber, setBusinessContactNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [gstCertificate, setGstCertificate] = useState(null);
  const [hasGst, setHasGst] = useState(false);
  const [shopCategory, setShopCategory] = useState("");
  const [shopImage, setShopImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shopCategory) {
      alert("Please select a shop category.");
      return;
    }

    if (!shopImage) {
      alert("Please upload a shop image.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("businessName", businessName);
    formData.append("ownerName", ownerName);
    formData.append("contactNumber", contactNumber);
    formData.append("businessContactNumber", businessContactNumber);
    formData.append("gstNumber", gstNumber);
    formData.append("hasGst", hasGst);
    formData.append("shopCategory", shopCategory);
    formData.append("shopImage", shopImage);

    if (gstCertificate) {
      formData.append("gstCertificate", gstCertificate);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/businessform`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Form submitted successfully:", response.data);

      alert("Business registered successfully!");

      // Redirect to seller profile page
      navigate("/sellerpage", {
        replace: false,
        state: { email, sellerId: response.data.sellerId },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form submission failed. Check console for details.");
    }
  };

  return (
    <div className="business-container">
      <div className="business-left">
        <div className="icon-container">
          <h2>Welcome to Business Registration</h2>
          <p>
            Set up your online store with us. Start selling your products and
            grow your business today!
          </p>
        </div>
      </div>

      <div className="business-right">
        <form onSubmit={handleSubmit} className="business-form">
          <h1>Fill the Business Details</h1>

          <div className="form-group">
            <label htmlFor="businessName">
              <FaBuilding className="form-icon" /> Business Name:
            </label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ownerName">
              <FaUser className="form-icon" /> Owner Name:
            </label>
            <input
              type="text"
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">
              <FaPhone className="form-icon" /> Contact Number:
            </label>
            <input
              type="number"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessContactNumber">
              <FaPhone className="form-icon" /> Business Contact Number:
            </label>
            <input
              type="number"
              id="businessContactNumber"
              value={businessContactNumber}
              onChange={(e) => setBusinessContactNumber(e.target.value)}
              required
            />
          </div>

          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                onChange={(e) => setHasGst(e.target.checked)}
              />
              <span>I have GST</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="gstNumber">
              <FaFileAlt className="form-icon" /> GST Number:
            </label>
            <input
              type="text"
              id="gstNumber"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              disabled={!hasGst}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gstCertificate">
              <FaCertificate className="form-icon" /> GST Certificate:
            </label>
            <input
              type="file"
              id="gstCertificate"
              accept=".pdf"
              onChange={(e) => setGstCertificate(e.target.files[0])}
              disabled={!hasGst}
            />
          </div>

          <div className="form-group">
            <label htmlFor="shopCategory">Shop Category:</label>
            <select
              id="shopCategory"
              value={shopCategory}
              onChange={(e) => setShopCategory(e.target.value)}
              required
            >
              <option value="">--Select a Category--</option>
              <option value="electronics">Electronics</option>
              <option value="gym">Gym</option>
              <option value="medical">Medical</option>
              <option value="sports">Sports</option>
              <option value="clothes">Clothes</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="shopImage">Shop Image:</label>
            <input
              type="file"
              id="shopImage"
              accept="image/*"
              onChange={(e) => setShopImage(e.target.files[0])}
              required
            />
          </div>

          <button id="submitButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusinessForm;
