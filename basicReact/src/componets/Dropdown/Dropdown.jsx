import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import './Dropdown.css'

const Dropdown = () => {
  return (
    <div>
         <div class="dropdown">
        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="true">
         {/* <i class="bi bi-menu-down"></i> */}
         <Icon.List className='List' />
        
     </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">About</a></li>
    <li><a class="dropdown-item" href="#">Contact Us</a></li>
    <li><a class="dropdown-item" href="#">Pricing</a></li>
    <li><a class="dropdown-item" href="#">Products</a></li>
    <li><a class="dropdown-item" href="#">Seller </a></li>
    <li><a class="dropdown-item" href="#">Privacy policy</a></li>
  </ul>
</div>   

    </div>
  )
}

export default Dropdown