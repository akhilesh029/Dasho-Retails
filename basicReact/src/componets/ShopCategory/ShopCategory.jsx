import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ShopCategory.css";
import catalog from '../../assets/Catalogue-pana.svg';

const ShopCategory = () => {
  const [categories, setCategories] = useState([]);  // Store fetched categories
  const [error, setError] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/api/shopcategory')  // Replace with your API endpoint
      .then((response) => {
        setCategories(response.data);  // Store fetched data
        console.log(response.data);  // Log the response data directly
      })
      .catch((err) => {
        setError('Failed to fetch categories');
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
                    src={`http://localhost:3000/${category.image && category.image.startsWith('/') ? category.image.slice(1) : category.image}`} 
                    alt={category.name} 
                  />
                  <p>{category.name}</p>  {/* Display category name below the image */}
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
