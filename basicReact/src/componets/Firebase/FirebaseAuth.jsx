import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./firebase.css";
 import SellerLogin from '../../Pages/SellerLogin/SellerLogin';
 import BusinessForm from '../../Pages/BusinessForm/BusinessForm';

const firebaseConfig = {
  apiKey: "AIzaSyCxCsr0TFWAgTcgDq2X-DjHCNtKyI7OMOA",
  authDomain: "desho-f66d9.firebaseapp.com",
  projectId: "desho-f66d9",
  storageBucket: "desho-f66d9.appspot.com",
  messagingSenderId: "351084185508",
  appId: "1:351084185508:web:e05c2b8430d43d8dc2a331",
  measurementId: "G-G3CBTCH1PX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
  const [email, setEmail] = useState(null)
  const [users, setUsers] = useState(null);

  
 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
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

  
  const navigate = useNavigate();

  const handleProfileClick = () => {
    // console.log(user.email);
    const email = user.email;  
    navigate("/businessform", { replace: false, state: { email } }); 
//       axios
//         .get("mongodb://localhost:27017/user")
//         .then((users) => setUsers(users.data))
//         .catch((err) => console.log(err));
//         // console.log(users)
//         console.log(users.length)
//            const userEmail = user.email
//            console.log(userEmail)
        
       
// if(users.length ===0){
//   navigate("/businessform", { replace: false, state: { email } });
// }
// else{

//   for (let i = 0; i < users.length; i++) {
//     console.log(users[i].email)
//     const userEmail = user.email
//     if (users[i].email == user.email) {
//       navigate("/sellerpage", { replace: false, state: { userEmail } });
//       break;
//     } else {
//       navigate("/businessform", { replace: false, state: { email } });
//     }
//   }
// }

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

  // const saveUserToMongoDB = async (user) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/users', {
  //       name: user.displayName,
  //       email: user.email,
  //       phoneNumber: user.phoneNumber || 'N/A'
  //     });
  //     console.log('User data saved to MongoDB:', response.data);
  //   } catch (error) {
  //     console.error('Error saving user data to MongoDB:', error);
  //   }
  // };

  return (
    <div>
      {isLoggedIn ? (
        <div className='signup' ref={dropdownRef}>
          <ul>
            <li onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              <p>{user.displayName}</p>
              {dropdownVisible && (
                <ul className='dropdown-menu'>
                  <li className='profile-button' onClick={handleProfileClick}>Profile</li>
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
