import React from "react";
import { FaStore, FaHandshake, FaShoppingCart } from "react-icons/fa"; // Importing icons
import "./WelcomePage.css"; // Import the CSS for styling
import { assets } from "../../../../basicReact/src/assets/assets";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>Welcome to DASHO</h1>
        <p>Let's create your shop and start selling!</p>
      </div>

      <div className="features-container">
        <div className="feature">
          <FaStore className="feature-icon" />
          <h3>Create Your Shop</h3>
          <p>Set up your store with ease and showcase your products.</p>
        </div>

        <div className="feature">
          <FaHandshake className="feature-icon" />
          <h3>Connect with Customers</h3>
          <p>Engage with your customers and build lasting relationships.</p>
        </div>

        <div className="feature">
          <FaShoppingCart className="feature-icon" />
          <h3>Start Selling</h3>
          <p>Launch your products and start making sales today!</p>
        </div>
      </div>

     
    </div>
  );
};

export default WelcomePage;
