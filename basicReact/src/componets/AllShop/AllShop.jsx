import React from 'react';
import "./AllShop.css";
import { useNavigate } from 'react-router-dom';
import { shopsData } from '../../assets/shopdata';
import shopImage from "../../assets/shopImage.jpg"

const AllShop = () => {
  const navigate = useNavigate();
  
  const handleClick = (shop) => {
    const formattedShopName = shop.name.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens
     navigate(`/shop/${formattedShopName}`); // Navigate to a dynamic route based on the shop name
  };

  return (
    <div className="container">
      <h1>All Shops</h1>
      <div className="shopGrid">
        {shopsData.map((shop) => (
          <div key={shop.id} className="shopCard">
            <h2 className='shop-title'>{shop.name}</h2>
            <img src={shopImage} alt="" />
            <div className="rating-category">
                 <p className='shop-card-category'>{shop.category}</p>
                 <p>{shop.rating}⭐</p>
            </div>
            
            <button onClick={() => handleClick(shop)} className="viewButton">View Shop</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllShop;
