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
        // console.log(categories.data)
      })
      .catch((err) => {
        setError('Failed to fetch categories');
      });
  }, []);  // Empty dependency array ensures this runs once on mount


  // Function to map category name to image URL
  const getCategoryImage = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'gym':
        return 'https://www.sportswing.in/wp-content/uploads/2021/07/Bodyfit-Home-Gym-Combo-Home-Gym-Set-Equipment-12kg.jpg';  // Replace with actual image URL
      case 'electronics':
        return 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?cs=srgb&dl=pexels-pixabay-356056.jpg&fm=jpg';  // Replace with actual image URL
      case 'medical':
        return 'https://www.ibef.org/assets/images/Medical-Devices-Industry-2.jpg';  // Replace with actual image URL
      case 'sports':
        return 'https://www.edudwar.com/wp-content/uploads/2021/12/Indian-Sports-Persons-and-Athletes.jpg.webp';  // Replace with actual image URL
      case 'clothes':
        return 'https://www.c-and-a.com/image/upload/q_auto:good,ar_4:3,c_fill,g_auto:face,w_342/s/editorial/zero-waste/at-zerowaste-spenden-text-media-header.jpg';  // Replace with actual image URL
      default:
        return 'https://www.shutterstock.com/image-illustration/shopping-basket-full-variety-grocery-600nw-1978733351.jpg';  // Default image if category doesn't match
    }
  };


  return (
    <div className='shopcategory'>
      <div className="product-category">
        <h1>Available Shops Category</h1>
        {error && <div className="error">{error}</div>}  {/* Display error message if any */}

        <div className="product-items">
          <img className='product-items-img' src={catalog} alt="Catalog" />
          
          <div className='product-item'>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div className="item" key={category.id}>
  {/* Use getCategoryImage function to set image URL */}
                   <img src={getCategoryImage(category)} 
                    alt={category} 
                  />               
                 
                 <p>{category}</p>  {/* Display category name below the image */}
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
