import React, { useState } from 'react';
import axios from 'axios';
import './BusinessForm.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function BusinessForm() {
  const location = useLocation();
  const userEmail = location.state;
  const email = userEmail.email;
  const navigate = useNavigate();

  // Form state
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [businessContactNumber, setBusinessContactNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [gstCertificate, setGstCertificate] = useState(null);
  const [hasGst, setHasGst] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('businessName', businessName);
    formData.append('ownerName', ownerName);
    formData.append('contactNumber', contactNumber);
    formData.append('businessContactNumber', businessContactNumber);
    formData.append('gstNumber', gstNumber);
    formData.append('hasGst', hasGst);

    if (gstCertificate) {
      formData.append('gstCertificate', gstCertificate);
    }

    try {
      const response = await axios.post("http://localhost:3000/savedetails", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form data submitted successfully:', response.data);
      
      // Reset the form fields
      setBusinessName('');
      setOwnerName('');
      setContactNumber('');
      setBusinessContactNumber('');
      setGstNumber('');
      setGstCertificate(null);
      setHasGst(false);
      
      navigate('/welcome', { replace: true, state: { email } });
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="business">
      <div className="welcome-seller-container">
        <div className="welcome-seller-img">
          <img src="../../../public/Finance app-cuate.svg" alt="Welcome Illustration" />
        </div>
        <div>
          <div className="welcome-seller">Welcome to Desho</div>
          <div className="welcome-message">
            We’re thrilled to have you join our seller community! At Desho, we empower sellers to grow their business by reaching a wider audience. Get ready to showcase your products, track your progress, and watch your sales grow. Let’s make something amazing together!
          </div>
        </div>
      </div>

      <h1>Fill the Bussiness Details</h1>
      <form onSubmit={handleSubmit} className="business-form">
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
          {/* <p className="checkbox-label" id='gstCheckbox'>
           <label >
             <input
                type="checkbox"
                onChange={(e) => setHasGst(e.target.checked)}
             />
             <p>I have GST</p>   
           </label>
          </p> */}
       

        </div>

        <button id='submitButton' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BusinessForm;
