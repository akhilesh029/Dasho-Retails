import React from 'react';
import './app.css'
import Clothes from './Pages/Clothes/Clothes'
import Header from './componets/Header/Header';
import Home from './Pages/Clothes/Home/Home';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componets/Navbar/Navbar';
import Features from './componets/Features/Features';
import Maindiv from './componets/MainDiv/MainDiv';

import ContextProvider from './contexts/AppContext';



function App(){
 
  return (
    <>
    

     <Header />
     <Home />
     <Navbar />
     <Maindiv />
     <Features/> 

     <Clothes />
    
      
    </>
  )
}

export default App