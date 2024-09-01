import React from 'react';
import './app.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages//Home';
import Navbar from './componets/Navbar/Navbar';

function App(){
  return (
    <div className='app'>
      
       <Navbar />
       <Routes>
           < Route path='/' element={<Home />} />
       </Routes>
  
    </div> 
  )
}

export default App

 