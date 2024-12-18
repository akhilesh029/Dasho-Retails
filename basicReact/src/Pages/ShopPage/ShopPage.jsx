import React from 'react'
import { useParams } from 'react-router-dom';
import {cards} from "../../assets/assets";
import img from "../../assets/p1.jpeg";
import "./ShopPage.css"
import Header from '../../componets/Header/Header';
import shopImage from '../../assets/Research paper-rafiki.svg'
import { FaSearch } from "react-icons/fa";
import shopBag from "../../assets/Shopping bag-cuate.svg"
import image from "../../assets/pexels-nubikini-385998.jpg"
import shirt from "../../assets/shirt.webp"



const ShopPage = (card) => {
    const { shopName } = useParams(); // Get the shop name from URL
    const formattedShopName = shopName.replace(/-/g, ' '); // Replace hyphens back to spaces
  
    // Find the shop details based on the shopName
    const shopDetails = cards.find(card => card.shopName.toLowerCase().replace(/\s+/g, '-') === shopName);
    if (!shopDetails) {
      return <h1>Shop not found!</h1>; // Handle case where shop is not found
    }


  
    return (
        <div className="shop-page">
          <header className="shop-header">
             <div className="logo-container">
                 <h1 className="website-name">YourWebsite Name</h1> {/* Website name */}
             </div>
             <nav className="nav-links">
                {/* Add any navigation links here if needed */}
             </nav>
         </header>
             
           <div className="shop-image-container">
               <img src={shopImage} alt="" className='shop-image' />
               <div className='shop-heading'>
                   <h1><b> Store for Children</b> </h1>
                   <p>Shoppig with joy</p>
                   <div className="search-bar">
                     <FaSearch className="search-icon" />
                    <input
                     type="text"
                     placeholder="Search..."
                     className="search-input"
                    />
                 </div>
               </div> 
           </div>
           <div className="product-category">
                <h1>Available Products</h1>
                <div className="product-items">
                  <img src={shopBag} alt="" />
                  <div className='product-item'>
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
                <h1>Available items</h1>
                <div className="available-items">
                     <div className="available-item">
                         <div className="img-container">
                              <img className='available-item-img' src={shirt} alt="" />
                         </div>
                         <div className="item-info">
                           <div className="item-name-rating">
                              <p>Product Name</p>
                                  {/* <img src={assets.rating_starts} alt="" /> */}
                                  <p>⭐⭐⭐⭐</p>
                             </div>
                            <p className='item-desc'>Description</p>
                            <p className='item-price'>Price : ₹100</p>
                        </div>
                     </div>
                     <div className="available-item">
                         <div className="img-container">
                              <img className='available-item-img' src={shirt} alt="" />
                         </div>
                         <div className="item-info">
                           <div className="item-name-rating">
                              <p>Product Name</p>
                                  {/* <img src={assets.rating_starts} alt="" /> */}
                                  <p>⭐⭐⭐⭐</p>
                             </div>
                            <p className='item-desc'>Description</p>
                            <p className='item-price'>Price : ₹100</p>
                        </div>
                     </div>
                     <div className="available-item">
                         <div className="img-container">
                              <img className='available-item-img' src={shirt} alt="" />
                         </div>
                         <div className="item-info">
                           <div className="item-name-rating">
                              <p>Product Name</p>
                                  {/* <img src={assets.rating_starts} alt="" /> */}
                                  <p>⭐⭐⭐⭐</p>
                             </div>
                            <p className='item-desc'>Description</p>
                            <p className='item-price'>Price : ₹100</p>
                        </div>
                     </div>
                     <div className="available-item">
                         <div className="img-container">
                              <img className='available-item-img' src={shirt} alt="" />
                         </div>
                         <div className="item-info">
                           <div className="item-name-rating">
                              <p>Product Name</p>
                                  {/* <img src={assets.rating_starts} alt="" /> */}
                                  <p>⭐⭐⭐⭐</p>
                             </div>
                            <p className='item-desc'>Description</p>
                            <p className='item-price'>Price : ₹100</p>
                        </div>
                     </div>
                     <div className="available-item">
                         <div className="img-container">
                              <img className='available-item-img' src={shirt} alt="" />
                         </div>
                         <div className="item-info">
                           <div className="item-name-rating">
                              <p>Product Name</p>
                                  {/* <img src={assets.rating_starts} alt="" /> */}
                                  <p>⭐⭐⭐⭐</p>
                             </div>
                            <p className='item-desc'>Description</p>
                            <p className='item-price'>Price : ₹100</p>
                        </div>
                     </div>
                     <div className="available-item">
                         <div className="img-container">
                              <img className='available-item-img' src={shirt} alt="" />
                         </div>
                         <div className="item-info">
                           <div className="item-name-rating">
                              <p>Product Name</p>
                                  {/* <img src={assets.rating_starts} alt="" /> */}
                                  <p>⭐⭐⭐⭐</p>
                             </div>
                            <p className='item-desc'>Description</p>
                            <p className='item-price'>Price : ₹100</p>
                        </div>
                     </div>
                </div>
           </div>
        
        </div>
    );
  };
export default ShopPage;
