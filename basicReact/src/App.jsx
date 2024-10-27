import React from 'react';
import './app.css'

import { Route, Routes } from 'react-router-dom'
import Profile from './Pages/Profile/Profile';


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
import ShowOnHOme from './componets/ShowOnHome/ShowOnHOme';



function App(){
  return (

    <div className='app'>
       <Header />
       <Navbar />
       <Routes>
           < Route path='/' element={<Home />} />
           < Route path='/profile' element={<Profile />}/>
       </Routes>
    </div> 

  )
}

export default App

 