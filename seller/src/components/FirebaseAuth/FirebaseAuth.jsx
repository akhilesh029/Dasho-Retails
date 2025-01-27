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
import "./FirebaseAuth.css";
import { FaSignInAlt } from "react-icons/fa"; // Import the Font Awesome icon

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
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // Using a different key name like "sellerToken"
        user.getIdToken().then((sellerToken) => {
          localStorage.setItem("sellerToken", sellerToken); // Using "sellerToken" as the key
          console.log("Token saved to localStorage:", sellerToken);
          setUser(user);
        });

        console.log("Seller logged in:", user);

        // checkSellerExistence(user.email);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  const checkSellerExistence = (email) => {
    axios
      .get(`http://localhost:3000/seller`, { params: { email } })
      .then((response) => {
        const sellers = response.data;

        if (!sellers || sellers.length === 0) {
          // If seller does not exist, navigate to the business form
          navigate("/businessform", { replace: false, state: { email } });
        } else {
          // If seller exists, navigate to the seller page
          navigate("/sellerpage", {
            replace: false,
            state: { userEmail: email, sellerId: sellers.sellerId },
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log("Seller not found. Navigating to the business form...");
          navigate("/businessform", { replace: false, state: { email } });
        } else {
          console.error("Error checking seller existence:", err);
        }
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("sellerToken");
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

  return (
    <div>
      {isLoggedIn ? (
        <div className="signup" ref={dropdownRef}>
          <ul>
            <li onClick={toggleDropdown} style={{ cursor: "pointer" }}>
              <p>{user.displayName}</p>

              {dropdownVisible && (
                <ul className="dropdown-menu">
                  <li
                    className="profile-button"
                    onClick={() => checkSellerExistence(user.email)}
                  >
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
        <button onClick={handleLogin} className="seller-login-button">
          <FaSignInAlt style={{ marginRight: "8px" }} />
          Login
        </button>
      )}
    </div>
  );
};

export default FirebaseAuth;
