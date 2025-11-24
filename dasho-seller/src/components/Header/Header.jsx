// Header.js
import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';

import { assets } from '../../../../dasho-frontend/src/assets/assets';
import { MdSearch } from 'react-icons/md'; 
import FirebaseAuth from '../FirebaseAuth/FirebaseAuth';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={assets.logo2} alt="Logo" /> 
        </Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button><MdSearch /></button> 
      </div>
      
        <FirebaseAuth /> 
       
      
    </header>
  );
}

export default Header;