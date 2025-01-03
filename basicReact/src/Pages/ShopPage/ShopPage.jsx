import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import img from "../../assets/p1.jpeg";
import "./ShopPage.css";
import shopImage from '../../assets/Research paper-rafiki.svg';
import { FaSearch } from "react-icons/fa";
import shopBag from "../../assets/Shopping bag-cuate.svg";
import image from "../../assets/pexels-nubikini-385998.jpg";
import shirt from "../../assets/shirt.webp";
import { AppContext } from "../../context/AppContext";

const ShopPage = () => {
  const { shops, loading, error } = useContext(AppContext);
  const { shopName } = useParams();
  // console.log(shopName)
  
  console.log(shops);
  // Guard clauses
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong! Please try again later.</h1>;
  if (!shops || shops.length === 0) return <h1>No shops available!</h1>;

  const formattedShopName = shopName.replace(/-/g, " ");

  // Find the shop details based on the shopName
  const shopDetails = shops.find(
    (shop) => shop.businessName.toLowerCase().replace(/\s+/g, "-") === shopName
  );
  // console.log(shopDetails)

  if (!shopDetails) return <h1>Shop not found!</h1>;

  return (
    <div className="shop-page">

      <div className="shop-image-container">
        <img src={shopImage} alt="" className="shop-image" />
        <div className="shop-heading">
          <h1><b>{shopDetails.businessName}</b></h1>
          <p>Shopping with joy</p>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." className="search-input" />
          </div>
        </div>
      </div>

      <div className="product-category">
        <h1>Available Products</h1>
        <div className="product-items">
          <img src={shopBag} alt="" />
          <div className="product-item">
            <div className="item"><img src={image} alt="" /></div>
            <div className="item"><img src={image} alt="" /></div>
            <div className="item"><img src={image} alt="" /></div>
            <div className="item"><img src={image} alt="" /></div>
            <div className="item"><img src={image} alt="" /></div>
            <div className="item"><img src={image} alt="" /></div>
          </div>
        </div>
      </div>

      <div className="available-items-container">
        <h1>Available Items</h1>
        <div className="available-items">
          {shopDetails.products && shopDetails.products.length > 0 ? (
            shopDetails.products.map((product, index) => (
              <div className="available-item" key={index}>
                <div className="img-container">
                  <img className="available-item-img" src={shirt} alt={product.name} />
                </div>
                <div className="item-info">
                  <div className="item-name-rating">
                    <p>{product.name}</p>
                    <p>⭐⭐⭐⭐</p>
                  </div>
                  <p className="item-desc">{product.description}</p>
                  <p className="item-price">Price: ₹{product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products available for this shop.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
