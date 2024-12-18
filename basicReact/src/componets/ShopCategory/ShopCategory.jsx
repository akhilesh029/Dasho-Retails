import React from 'react'
import "./ShopCategory.css"
import image from '../../assets/pexels-nubikini-385998.jpg'
import catalog from '../../assets/Catalogue-pana.svg'

const ShopCategory = () => {
  return (
    <div className='shopcategory'>
       <div className="product-category">
                <h1>Available Shops Category</h1>
                <div className="product-items">
                  <img className='product-iems-img' src={catalog} alt="" />
                  <div className='product-item'>
                    <div className="item"><img src={image} alt="" /></div>
                    <div className="item"><img src={image} alt="" /></div>
                    <div className="item"><img src={image} alt="" /></div>
                    <div className="item"><img src={image} alt="" /></div>
                    <div className="item"><img src={image} alt="" /></div>
                    <div className="item"><img src={image} alt="" /></div>
                  </div>
                </div>
         </div>

    </div>
  )
}

export default ShopCategory
