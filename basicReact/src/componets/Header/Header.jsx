import './Header.css'
import { assets } from '../../assets/assets'
import Dropdown from '../Dropdown/Dropdown'

function Header(){


  const signInAccount = ()=>{
    window.open('/sellerlogin', '_self')
  }

  return(
    <>
    <div className="headerEle">
      <div id="header" className='logo'>
        <img src={assets.logo2} alt="" />
      </div>
      <div id="header" className='div2'>
        <p>Shop</p>
        <div className='verticalLine'></div>
        <form className='headerform' action="">
            <input placeholder='What are you looking for?...' type="text" />
            <button type='submit'>Search</button>
        </form>
      </div>
      {/* <button className='bulkReq'>Bulk Requirement</button> */}
      {/* <button className="headerbtn">My Items</button> */}
      {/* <button onClick={signInAccount} className="headerbtn">Sign in</button> */}
      <nav>
        <ul class="menu">
            <li className="menu-item"><a href="#">My Items</a></li>
            <li className="menu-item"><a href="#">About</a></li>
            <li className="menu-item dropdown">
                <a href="#">Sign In</a>
                <ul class="dropdown-menu">
                    <li><a href="#" >As a Seller</a></li>
                    <li><a href="#">As a Customer</a></li>
                </ul>
            </li>
            <li class="menu-item"><a href="#">Contact</a></li>
            <li class="menu-item"><a href="#">Card</a></li>
        </ul>
    </nav>

      {/* <button className="headerbtn">Cart</button> */}
      </div>
     

    </>
  )

}

export default Header