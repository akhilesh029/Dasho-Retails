import './Header.css'
import { assets } from '../../assets/assets'
import Dropdown from '../Dropdown/Dropdown'
import Firebase from "../Firebase/FirebaseAuth";

import { useNavigate } from 'react-router-dom'

function Header(){
//---------------navigate to showonhome------------
  const navigate = useNavigate()
  // const handleCartItem=()=>{
  //   navigate('/showonhome', { replace: true, state:  "yes"  });
  // }


  const signInAccount = ()=>{
    window.open('/sellerlogin', '_self')
  }

  return (
    <>
      <div className="headerEle">
        <div id="header" className="logo">
          <img src={assets.logo2} alt="" />
        </div>
        <div id="header" className="div2">
          <p>Shop</p>
          <div className="verticalLine"></div>
          <form className="headerform" action="">
            <input placeholder="What are you looking for?..." type="text" />
            <button type="submit">Search</button>
          </form>
        </div>

        <nav>
          <ul className="menu">
            <li className="menu-item"><a href="">Cart Items</a></li>
            <li className="menu-item"><a href="#">About</a></li>
            <li className="menu-item"><a href="/footer">Contact</a></li>
            <li className="menu-item dropdown">

             <Firebase />
 
            </li>            
           {/* <li>
             <a href="#">Sign In</a>
             <ul class="dropdown-menu">
                   <li><a href="#" onClick={signInAccount} >As a Seller</a></li>
                   <li><a href="#">As a Customer</a></li>
             </ul>
         </li> */}
            {/* <li className="menu-item"><a href="/showonhome">Contact</a></li> */}
          </ul>
        </nav>

        {/* <button className="headerbtn">Cart</button> */}
      </div>
    </>
  );

}

export default Header