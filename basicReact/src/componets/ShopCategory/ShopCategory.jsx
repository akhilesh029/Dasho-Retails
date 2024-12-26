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
        console.log(categories)
       
      })
      .catch((err) => {
        setError('Failed to fetch categories');
      });
  }, []);  // Empty dependency array ensures this runs once on mount


 


  return (
    <div className='shopcategory'>
     
    </div>
  );
};

export default ShopCategory;
