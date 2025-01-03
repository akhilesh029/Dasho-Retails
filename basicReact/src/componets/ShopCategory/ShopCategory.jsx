import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ShopCategory.css";
import catalog from '../../assets/Catalogue-pana.svg';

const ShopCategory = () => {
  const [categories, setCategories] = useState([]);  // Store fetched categories
  const [error, setError] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/api/categories')
        .then((response) => {
            setCategories(response.data);
            console.log(response.data);
        })
        .catch((err) => {
            setError('Failed to load categories');
        });
}, []);  // Empty dependency array ensures this runs once on mount

  return (
    <div className='shopcategory'>
      <div className="product-items">
          <img className='product-items-img' src={catalog} alt="Catalog" />
          
          <div className='product-item'>
            {categories.length > 0 ? (
              categories.map((category) => (
                <div className="item" key={category.id}>
                  <img 
                    src={`http://localhost:3000/${category.shopImage && category.shopImage.startsWith('/') ? category.shopImage.slice(1) : category.shopImage}`} 
                    alt={category.shopCategory} 
                  />
                  <p>{category.shopCategory}</p>  {/* Display category name below the image */}
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
      </div>
  );
};

export default ShopCategory;
