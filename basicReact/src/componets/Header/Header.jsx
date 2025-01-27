import "./Header.css";
import { assets } from "../../assets/assets";
import Firebase from "../Firebase/FirebaseAuth";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaPhone, FaHome } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

  const handleCartItem = () => {
    navigate('/cart');
  };

  const createShop = () => {
    window.location.href = 'http://localhost:3001/';
  };

  function HomeRoute() {
    navigate("/");
  }

  return (
    <div className="header">
      {/* Logo */}
      <div className="logo_div">
        <img id="reloadButton" onClick={HomeRoute} src={assets.logo2} alt="logo" />
      </div>

      {/* Search Bar */}
      <div className="search-bar main_search_bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>

      {/* Header List */}
      <div className="header_list">
        <ul className="menu">
          <li className="menu-item" onClick={handleCartItem}>
            <FaShoppingCart className="menu-icon" />
            Cart
          </li>
          <li className="menu-item">
            <FaPhone className="menu-icon" />
            Contact Us
          </li>
          <li className="menu-item" onClick={createShop}>
              <FaHome className="menu-icon" />Create Shop
           
          </li>
          <li className="menu-item dropdown">
          <Firebase />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
