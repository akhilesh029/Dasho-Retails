import React from 'react';
import { useState ,useEffect} from 'react';
import "./AllShop.css";
import { useNavigate } from 'react-router-dom';
import { shopsData } from '../../assets/shopdata';
import shopImage from "../../assets/shopImage.jpg"
import axios from 'axios';


const AllShop = () => {


  const [data, setData] = useState([])
    
  // const location = useLocation();
  // console.log(location.state.email)
  // const userEmail = location.state.email
  // console.log(userEmail)
 

  const navigate = useNavigate()


   // request to userdata from database
   const handleClick = (shop) => {
    console.log(shop);
    const formattedShopName = shop.name.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens
    console.log(formattedShopName);
  
    // Fetch users from the backend
    axios
      .get('http://localhost:3000/user')
      .then((response) => {
        const data = response.data; // Extract user data from the response
        console.log(data)
        console.log(data[0].businessName); // Log the fetched users
  
        // Perform navigation after fetching users
        navigate(`/shop/${formattedShopName}`, { state: { shop } }); // Pass users as state if needed
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <> 
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


   

</>
  );
};

export default AllShop;
