import React from 'react';
import './app.css'
import Clothes from './Pages/Clothes/Clothes'
import Header from './componets/Header/Header';
import Home from './Pages/Clothes/Home/Home';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componets/Navbar/Navbar';
import Features from './componets/Features/Features';
import Maindiv from './componets/MainDiv/MainDiv';

import Clothesdetails from './Pages/Clothes/Clothesdetails/Clothesdetails';
import FeaturedPro from './componets/FeaturedProducts/FeaturedPro';
import Cosmetics from './Pages/Clothes/Cosmetics/Cosmetics';
import Pharmaceuticals from './Pages/Pharmaceutical/Pharmaceutical';
import SellerCreateAccount from './Pages/CreateAccOfSeller/CreateAccOfSeller';
import Dropdown from './componets/Dropdown/Dropdown';



function App(){
 
  return (
    <>
    

      <Header />
     {/* <Home /> */}
     <Navbar />
     {/* <Dropdown /> */}
     <Maindiv />
     <FeaturedPro />
     <Features/>  
     {/* <SellerCreateAccount /> */}
     <Cosmetics />
     <Pharmaceuticals /> 
      <Clothes />
     
    
      
    </>
  )
}

export default App