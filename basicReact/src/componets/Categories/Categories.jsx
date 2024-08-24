import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import './Categories.css'

const Categories = () => {
  return (
 
     <div class="dropdown">
        <button class="btn" type="button" data-bs-toggle="dropdown" >
         {/* <i class="bi bi-menu-down"></i> */}
         {/* <Icon.List className='List' />   */}
         <p className='ctg-list'>Categories</p>
        </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="/clothes">Clothes</a></li>
    <li><a class="dropdown-item" href="cosmetics">Cosmetics Us</a></li>
    <li><a class="dropdown-item" href="pharmaceuticals">Pharmaceuticals</a></li>
    <li><a class="dropdown-item" href="#">WoodenArticles</a></li>
    <li><a class="dropdown-item" href="#">Pet foods </a></li>
    <li><a class="dropdown-item" href="#">Electronics</a></li>
  </ul>

   
</div>
  )
}

export default Categories