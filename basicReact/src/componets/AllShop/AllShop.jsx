import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllShop.css";
import shopImage from "../../assets/shopImage.jpg"; // Use a placeholder image or the actual shop image URL
import { AppContext } from "../../context/AppContext";

const AllShop = () => {
  const { shops, loading, error } = useContext(AppContext);
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  // Handle the click event for each shop card
  const handleClick = (email) => {
    // console.log(email)
    navigate(`/shop/${email}`);  // Navigate to a dynamic route based on the shop name
   };

  return (
    <div className="container">
      <h1>All Shops</h1>
      {error && <p className="error-message">{error}</p>} {/* Display error if exists */}
      <div className="shopGrid">
        {shops.length === 0 ? (
          <p>No shops available.</p>
        ) : (
          shops.map((shop) => (
            <div key={shop._id} className="shopCard">
              <h2 className="shop-title">{shop.businessName}</h2>
              <img
                                    src={
                                      shop.shopImage
                                        ? `http://localhost:3000/${shop.shopImage}`
                                        : placeholderImg
                                    }
                                    alt={shop.businessName}
                                    className="card-image"
                                  />
              <div className="rating-category">
                <p className="shop-card-category">{shop.shopCategory}</p>
                  <p>{shop.rating}</p>
              </div>
              <button onClick={() => handleClick(shop.email)} className="viewButton">
                View Shop
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllShop;
