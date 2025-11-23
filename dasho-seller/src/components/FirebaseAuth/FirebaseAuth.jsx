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
import { FaSignInAlt } from "react-icons/fa";

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

  // ------------------ Auth State ------------------
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

  // ------------------ Google Login ------------------
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        user.getIdToken().then((sellerToken) => {
          localStorage.setItem("sellerToken", sellerToken);
          console.log("Token saved to localStorage:", sellerToken);
        });

        setUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  // ------------------ Seller Check (Fixed) ------------------
  const checkSellerExistence = (email) => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/seller`, { params: { email } })
      .then((response) => {
        const seller = response.data; // backend returns a SINGLE object

        if (!seller || !seller.sellerId) {
          console.log("Seller not found → redirecting to Business Form...");
          navigate("/businessform", { replace: false, state: { email } });
        } else {
          console.log("Seller found → sellerId:", seller.sellerId);
          navigate("/sellerpage", {
            replace: false,
            state: {
              userEmail: email,
              sellerId: seller.sellerId, // FIXED
            },
          });
        }
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          navigate("/businessform", { replace: false, state: { email } });
        } else {
          console.error("Error checking seller existence:", err);
        }
      });
  };

  // ------------------ Logout ------------------
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        localStorage.removeItem("sellerToken");
        setUser(null);
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  // ------------------ Dropdown ------------------
  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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
                  <li className="logout-button" onClick={handleLogout}>
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
