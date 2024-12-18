import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./firebase.css";
import SellerLogin from "../../Pages/SellerLogin/SellerLogin";
import BusinessForm from "../../Pages/BusinessForm/BusinessForm";

const firebaseConfig = {
  apiKey: "AIzaSyCxCsr0TFWAgTcgDq2X-DjHCNtKyI7OMOA",
  authDomain: "desho-f66d9.firebaseapp.com",
  projectId: "desho-f66d9",
  storageBucket: "desho-f66d9.appspot.com",
  messagingSenderId: "351084185508",
  appId: "1:351084185508:web:e05c2b8430d43d8dc2a331",
  measurementId: "G-G3CBTCH1PX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
        setIsLoggedIn(true);
        setUser(user);
        console.log(user)
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
        console.error("Error logging in:", error);
      });
  };

  const navigate = useNavigate();

  const handleProfileClick = () => {
    const email = user.email;
  
    // Request to get user data from the backend
    axios
      .get("http://localhost:3000/user")
      .then((response) => {
        const users = response.data; // Extract the user data from the response
  
        console.log(users.length); // Log the number of users
        console.log(user.email);   // Log the current user's email
  
        if (users.length === 0) {
          // If no users are found, navigate to the business form
          navigate("/businessform", { replace: false, state: { email } });
        } else {
          // Check if the current user's email matches any user in the list
          const userExists = users.some((userObj) => userObj.email === user.email);
  
          if (userExists) {
            // If the user exists, navigate to the seller page
            navigate("/sellerpage", { replace: false, state: { userEmail: user.email } });
          } else {
            // If the user doesn't exist, navigate to the business form
            navigate("/businessform", { replace: false, state: { email } });
          }
        }
      })
      .catch((err) => {
        console.log(err); // Log any errors
      });
  };
  

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
    navigate("/");
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
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
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
      const response = await axios.post('http://localhost:27017/api/users', {
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
        <div className="signup" ref={dropdownRef}>
          <ul>
            <li onClick={toggleDropdown} style={{ cursor: "pointer" }}>
              <p>{user.displayName}</p>
              {dropdownVisible && (
                <ul className="dropdown-menu">
                  <li className="profile-button" onClick={handleProfileClick}>
                    Profile
                  </li>
                  <li className="logout-button" onClick={handleLogoutClick}>
                    Logout
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      ) : (
        <>
          <a href="#" onClick={toggleOptions}>
            Sign Up
          </a>
          {showOptions && (
            <ul className="dropdown-menu">
              <li
                onClick={() => handleOptionClick("Seller")}
                style={{ cursor: "pointer" }}
              >
                As a Seller
              </li>
              <li
                onClick={() => handleOptionClick("Customer")}
                style={{ cursor: "pointer" }}
              >
                As a Customer
              </li>
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default FirebaseAuth;
