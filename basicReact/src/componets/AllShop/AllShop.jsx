import React from "react";
import { useState, useEffect } from "react";
import "./AllShop.css";
import { useNavigate } from "react-router-dom";
import { shopsData } from "../../assets/shopdata";
import shopImage from "../../assets/shopImage.jpg";
import axios from "axios";

const AllShop = () => {
  const [allshops, setAllshops] = useState([]);

  const navigate = useNavigate();

  // Fetch users from the backend
 

  // request to userdata from database
  const handleClick = (shop) => {
    console.log(shop);
    const formattedShopName = shop.name.toLowerCase().replace(/\s+/g, "-"); // Replace spaces with hyphens
    console.log(formattedShopName);

          // Perform navigation after fetching users
          navigate(`/shop/${formattedShopName}`, { state: { shop } }); // Pass users as state if needed
  };

  return (
 
      <div className="container">
        <h1>All Shops</h1>
        <div className="shopGrid">
          {shopsData.map((shop) => (
            <div key={shop.id} className="shopCard">
              <h2 className="shop-title">{shop.name}</h2>
              <img src={shopImage} alt="" />
              <div className="rating-category">
                <p className="shop-card-category">{shop.category}</p>
                <p>{shop.rating}⭐</p>
              </div>

              <button onClick={() => handleClick(shop)} className="viewButton">
                View Shop
              </button>
            </div>
          ))}
        </div>
      </div>

     
   
  );
};

export default AllShop;
