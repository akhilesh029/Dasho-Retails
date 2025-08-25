import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

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
  const { shops, loading } = useContext(AppContext);
  const { email } = useParams();
  // console.log(email)

  const [items, setItems] = useState([]); // State to store the product data
  const [shopDetails, setShopDetails] = useState(null); // State to store shop details
  const [error, setError] = useState([]); // State to store the product data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await axios.get(
          `http://localhost:3000/sellers/${email}`
        );
        setItems(productsResponse.data);

        // Fetch shop details
        const shopResponse = await axios.get(
          `http://localhost:3000/shops/${email}`
        );
        setShopDetails(shopResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, [email]); // Dependency array includes 'email'

  console.log(shopDetails);

  return (
    <div className="shop-page">

       <div>
    {shopDetails ? (
      <>
        <header className="shop-header">
          <div className="logo-container">
            <h1 className="website-name">{shopDetails[0].businessName}</h1>
          </div>
        </header>

        <div className="shop-image-container">
          <img
            src={`http://localhost:3000/${shopDetails[0].shopImage}`}
            alt={shopDetails[0].businessName}
            className="shop-image"
          />
          <div className="shop-heading">
            <h1><b>{shopDetails[0].shopCategory}</b></h1>
            <p>{shopDetails[0].description}</p>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder={`Search in ${shopDetails[0].businessName}`}
                className="search-input"
              />
            </div>

          </div>
        </div>
      </>
    ) : (
      <p>Loading shop details...</p>
    )}
  </div>


      {/* <div className="product-category">
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
      </div> */}

      <div className="available-items-container">
        <h2>Available Items</h2>
        <div className="available-items">
          {items && items.length > 0  ? (
            items.map((product, index) => (
              <div className="available-item" key={index}>
                <div className="img-container">
                  <img className="available-item-img" src={`http://localhost:3000/` + product.itemImage} alt={product.name} />
                </div>
                <div className="item-info">
                  <div className="item-name-rating">
                    <p>{product.itemName}</p>
                    <p>⭐⭐⭐⭐</p>
                  </div>
                  <p className="item-desc">{product.itemDescription}</p>
                  <p className="item-price">Price: ₹{product.itemPrice}</p>
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
