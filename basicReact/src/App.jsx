import React from 'react';
import './app.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Navbar from './componets/Navbar/Navbar';
import Header from './componets/Header/Header';

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

 