import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllShop.css";
import shopImage from "../../assets/shopImage.jpg";
import { AppContext } from "../../context/AppContext";

const AllShop = () => {
  const { shops, loading, error } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (email) => {
    navigate(`/shop/${email}`);
  };

  return (
    <div className="container">
      <h1>All Shops</h1>
      {error && <p className="error-message">{error}</p>}

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
                    ? `${import.meta.env.VITE_BACKEND_URL}/${shop.shopImage}`
                    : shopImage
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
