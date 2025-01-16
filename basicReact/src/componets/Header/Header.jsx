import "./Header.css";
import { assets } from "../../assets/assets";
import Firebase from "../Firebase/FirebaseAuth";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


function Header() {
  //---------------navigate to showonhome------------
  const navigate = useNavigate();
  const handleCartItem=()=>{
    navigate('/cart');
  }

  const signInAccount = () => {
    window.open("/sellerlogin", "_self");
  };
function HomeRoute(){
    navigate("/");
}

  return (
      <div className="header">
        {/* logo */}
        <div  className="logo_div">
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

  <div className="header_list">
       <ul className="menu">
           <li onClick={handleCartItem}>Cart</li>
           <li>Contacts</li>
           <li className="menu-item dropdown">
            <Firebase />
           </li>
        </ul>
  </div>
       
        {/* <button className="headerbtn">Cart</button> */}
      </div>
  );
}

export default Header;

// #FFC300;