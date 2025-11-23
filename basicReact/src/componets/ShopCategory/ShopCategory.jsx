import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ShopCategory.css";
import catalog from '../../assets/Catalogue-pana.svg';

const ShopCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load categories');
      });
  }, []);

  return (
    <div className='shopcategory'>
      <div className="product-items">
        <img className='product-items-img' src={catalog} alt="Catalog" />

        <div className='product-item'>
          {categories.length > 0 ? (
            categories.map((category) => (
              <div className="item" key={category.id}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${category.shopImage}`}
                  alt={category.shopCategory}
                />
                <p>{category.shopCategory}</p>
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
