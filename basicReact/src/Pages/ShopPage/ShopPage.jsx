import React from 'react'
import { useParams } from 'react-router-dom';
import {cards} from "../../assets/assets";
import img from "../../assets/p1.jpeg";
import "./ShopPage.css"
import Header from '../../componets/Header/Header';


const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#A833FF', '#FFBF33'];

const ShopPage = (card) => {
    const { shopName } = useParams(); // Get the shop name from URL
    const formattedShopName = shopName.replace(/-/g, ' '); // Replace hyphens back to spaces
  
    // Find the shop details based on the shopName
    const shopDetails = cards.find(card => card.shopName.toLowerCase().replace(/\s+/g, '-') === shopName);
  
    if (!shopDetails) {
      return <h1>Shop not found!</h1>; // Handle case where shop is not found
    }


    const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
    return (
        <div className="shop-page">
        <div className="shop-header">
          <img src={shopDetails.img || img} alt={shopDetails.shopName} className="shop-image" />
          <h1 className="shop-title" style={{ color: randomColor }}>Welcome to {formattedShopName} Shop!</h1>
          <p className="shop-category">Category: {shopDetails.category}</p>
          <p className="shop-items-available">Items Available: {shopDetails.items_available}</p>
          <p className="shop-description">Description: {shopDetails.description}</p>
        </div>
  
        <div className="shop-items">
          <h2 className="items-heading">Items for Sale</h2>
          {shopDetails.items && shopDetails.items.length > 0 ? (
            <div className="items-grid">
              {shopDetails.items.map((item, index) => (
                <div className="item-card" key={index}>
                  <img src={item.img} alt={item.name} className="item-image" />
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">Price: ${item.price}</p>
                  <p className="item-description">{item.description}</p>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No items available for sale.</p>
          )}
        </div>
      </div>
    );
  };
export default ShopPage;
