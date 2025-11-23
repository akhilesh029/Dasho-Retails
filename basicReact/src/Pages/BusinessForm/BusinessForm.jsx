import React, { useState } from 'react';
import axios from 'axios';
import './BusinessForm.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import welcome from "../../assets/Finance app-cuate.svg";


function BusinessForm() {
  const location = useLocation();
  const userEmail = location.state;
  const email = userEmail.email;
  const navigate = useNavigate();

  // Form state
const [businessName, setBusinessName] = useState("");
const [ownerName, setOwnerName] = useState("");
const [contactNumber, setContactNumber] = useState("");
const [businessContactNumber, setBusinessContactNumber] = useState("");
const [gstNumber, setGstNumber] = useState("");
const [gstCertificate, setGstCertificate] = useState(null);
const [hasGst, setHasGst] = useState(false);
const [shopCategory, setShopCategory] = useState(""); // Added state for shop category
const [shopImage, setShopImage] = useState(null); // Added state for shop image

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Validation: Ensure a category is selected
  if (!shopCategory) {
    alert("Please select a shop category.");
    return;
  }

  // Validation: Ensure a shop image is uploaded
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
  formData.append("shopCategory", shopCategory); // Include shop category in form data
  formData.append("shopImage", shopImage); // Include shop image in form data

  if (gstCertificate) {
    formData.append("gstCertificate", gstCertificate);
  }

  try {
    const response = await axios.post("${import.meta.env.VITE_BACKEND_URL}/businessform", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Form data submitted successfully:", response.data);

    // Reset the form fields
    setBusinessName("");
    setOwnerName("");
    setContactNumber("");
    setBusinessContactNumber("");
    setGstNumber("");
    setGstCertificate(null);
    setHasGst(false);
    setShopCategory(""); // Reset shop category
    setShopImage(null); // Reset shop image

    navigate("/welcome", { replace: true, state: { email } });
  } catch (error) {
    console.error("Error submitting form data:", error);
  }
};


  return (
    <div className="business">
      <div className="welcome-seller-container">
        <div className="welcome-seller-img">
          <img src={welcome} alt="Welcome Illustration" />
        </div>
        <div>
          <div className="welcome-seller">Welcome to Desho</div>
          <div className="welcome-message">
            We're thrilled to have you join our seller community! At Desho, we empower sellers to grow their business by reaching a wider audience. Get ready to showcase your products, track your progress, and watch your sales grow. Let’s make something amazing together!
          </div>
        </div>
      </div>

{/* --------------------------------------------------------------------- */}
<form onSubmit={handleSubmit} className="business-form">
  <h1>Fill the Business Details</h1>

  <div>
    <label htmlFor="businessName">Business Name:</label>
    <input
      type="text"
      id="businessName"
      value={businessName}
      onChange={(e) => setBusinessName(e.target.value)}
      required
    />
  </div>
  <div>
    <label htmlFor="ownerName">Owner Name:</label>
    <input
      type="text"
      id="ownerName"
      value={ownerName}
      onChange={(e) => setOwnerName(e.target.value)}
      required
    />
  </div>
  <div>
    <label htmlFor="contactNumber">Contact Number:</label>
    <input
      type="number"
      id="contactNumber"
      value={contactNumber}
      onChange={(e) => setContactNumber(e.target.value)}
      required
    />
  </div>
  <div>
    <label htmlFor="businessContactNumber">Business Contact Number:</label>
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
  <div>
    <label htmlFor="gstNumber">GST Number:</label>
    <input
      type="text"
      id="gstNumber"
      value={gstNumber}
      onChange={(e) => setGstNumber(e.target.value)}
      disabled={!hasGst} // Disable if hasGst is false
    />
  </div>
  <div>
    <label htmlFor="gstCertificate">GST Certificate:</label>
    <input
      type="file"
      id="gstCertificate"
      accept=".pdf"
      onChange={(e) => setGstCertificate(e.target.files[0])}
      disabled={!hasGst} // Disable if hasGst is false
    />
  </div>

  {/* Dropdown for Shop Category */}
  <div>
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

  {/* New Div for Shop Image */}
  <div>
    <label htmlFor="shopImage">Shop Image:</label>
    <input
      type="file"
      id="shopImage"
      accept="image/*"
      onChange={(e) => setShopImage(e.target.files[0])}
      required
    />
  </div>

  <button id="submitButton" type="submit">Submit</button>
</form>


    </div>
  );
}

export default BusinessForm;
