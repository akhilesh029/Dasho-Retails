import React, { useState } from 'react';
import axios from 'axios';
import './DistributionForm.css';

function DistributionForm({ sellerData, products }) {
    const [distributionDetails, setDistributionDetails] = useState({});
    const [errors, setErrors] = useState({});
  

    
    const handleInputChange = (productId, quantity) => {
      setDistributionDetails({
        ...distributionDetails,
        [productId]: quantity,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Basic validation
      const errors = {};
      products.forEach((product) => {
        const quantity = distributionDetails[product.id];
        if (quantity > product.availableQuantity) {
          errors[product.id] = 'Quantity exceeds available stock';
        }
      });
  
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
  
      const formData = {
        sellerId: sellerData.id, // Assuming sellerData has an ID
        distributionDetails,
      };
  
      try {
        const response = await axios.post('/api/distribute', formData);
        console.log('Distribution successful:', response.data);
        // Handle success, e.g., show a success message, clear the form
      } catch (error) {
        console.error('Error submitting distribution:', error);
        // Handle errors, e.g., show an error message
      }
    };

  return (
    <>
    <h1>Choose items and apply</h1>
   
    
      {/* return (
        <div className="distribution-form">
          <h2 id="seller-info">Seller: {sellerData.name}</h2>
          <p id="seller-contact">Contact: {sellerData.contact}</p>
    
          <form onSubmit={handleSubmit}>
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">Price: {product.price}</p>
                  <p className="product-availability">Available Quantity: {product.availableQuantity}</p>
                  <div className="quantity-input">
                    <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${product.id}`}
                      value={distributionDetails[product.id] || 0}
                      onChange={(e) => handleInputChange(product.id, e.target.value)}
                    />
                    {errors[product.id] && <span className="error">{errors[product.id]}</span>}
                  </div>
                </div>
              ))}
            </div>
    
            <button type="submit" className="submit-button">Submit Request</button>
    
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      ); */}
      </>
  )
    }
    
    export default DistributionForm;
