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
      <div id="header">
      {/* <button className='bulkReq'>Bulk Requirement</button> */}
      <button className="headerbtn">My Items</button>
      <button onClick={signInAccount} className="headerbtn">Sign in <b>Account</b> </button>
      <button className="headerbtn">Cart</button>

      </div>
     

    </div>
    </>
  )

}

export default Header