import React, { useState } from 'react';
import axios from 'axios';
import './BusinessForm.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';

function BusinessForm(props) {

  
    // ---------------------------------------------
    const location = useLocation();
    const userEmail = location.state
    console.log(userEmail.email)
    const email = userEmail.email
    const navigate = useNavigate()
//---------------------------------------------------------
    const [businessName, setBusinessName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [businessContactNumber, setBusinessContactNumber] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [gstCertificate, setGstCertificate] = useState(null);
    const [hasGst, setHasGst] = useState(false);
    // const [email, setEmail] = useState(email)

  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('email', email)
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
        
        // Reset the form
        setBusinessName('');
        setOwnerName('');
        setContactNumber('');
        setBusinessContactNumber('');
        setGstNumber('');
        setGstCertificate(null);
        setHasGst(false);
        
        navigate('/welcome', {replace:true, state:{email}})
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
 };



  return (
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
      <div>
        <label htmlFor="gstNumber">GST Number:</label>
        <input
          type="text"
          id="gstNumber"
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
          disabled={!hasGst}
        />
      </div>

      <div>
        <label htmlFor="gstCertificate">GST Certificate:</label>
        <input
          type="file"
          id="gstCertificate"
          accept=".pdf"
          onChange={(e) => setGstCertificate(e.target.files[0])}
          disabled={!hasGst}
        />
        <p className="checkbox-label" id='gstCheckbox'>
          <label>
            <input
              type="checkbox"
              checked={hasGst}
              onChange={(e) => setHasGst(e.target.checked)}
            />
          </label>
            I have GST
        </p>
      </div>

      <button id='submitButton' type="submit">Submit</button>
    </form>
  );
}

export default BusinessForm;