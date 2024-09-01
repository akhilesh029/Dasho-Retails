import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import "./firebase.css";

const firebaseConfig = {
  apiKey: "AIzaSyAZA9_pJTeOEIU-91aXS7_-jOZFgd3FpcI",
  authDomain: "shivamdemo-ef5f5.firebaseapp.com",
  projectId: "shivamdemo-ef5f5",
  storageBucket: "shivamdemo-ef5f5.appspot.com",
  messagingSenderId: "349581977873",
  appId: "1:349581977873:web:6ba4e917a9867e37b244b0",
  measurementId: "G-B8T1H4WCF9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });
  }, []);

  const handleLogin = (role) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(`${role} logged in:`, result.user);
        saveUserToMongoDB(result.user);
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleLogoutClick = () => {
    setDropdownVisible(false);
    handleLogout();
  };

  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState);
  };

  const handleOptionClick = (role) => {
    setShowOptions(false);
    handleLogin(role); // Pass role ("Seller" or "Customer") to the login function
  };

  const saveUserToMongoDB = async (user) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber || 'N/A'
      });
      console.log('User data saved to MongoDB:', response.data);
    } catch (error) {
      console.error('Error saving user data to MongoDB:', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className='signup' ref={dropdownRef}>
          <ul>
            <li onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              <p>{user.displayName}</p>
              {dropdownVisible && (
                <ul className='dropdown-menu'>
                  <li className='logout-button' onClick={handleLogoutClick}>Logout</li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      ) : (
        <>
          <a href="#" onClick={toggleOptions}>Sign Up</a>
          {showOptions && (
            <ul className="dropdown-menu">
              <li onClick={() => handleOptionClick('Seller')} style={{ cursor: 'pointer' }}>As a Seller</li>
              <li onClick={() => handleOptionClick('Customer')} style={{ cursor: 'pointer' }}>As a Customer</li>
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default FirebaseAuth;
