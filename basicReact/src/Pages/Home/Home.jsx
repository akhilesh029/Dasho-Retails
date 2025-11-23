import React from 'react'
// import Maindiv from '../../componets/MainDiv/MainDiv';

import "./home.css"
import Shop from '../../componets/Shops/Shop';
//import ShowOnHOme from '../../componets/ShowOnHome/ShowOnHome';
import Navbar from '../../componets/Navbar/Navbar';
import AllShop from '../../componets/AllShop/AllShop';
import ShopCategory from '../../componets/ShopCategory/ShopCategory';



const Home = () => {

  return (
    <div className='home'>
        <Shop />
        <ShopCategory />
        <AllShop />
        
        
    </div>
  )
}

export default Home
