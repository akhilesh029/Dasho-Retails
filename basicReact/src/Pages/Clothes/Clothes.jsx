import React from 'react'

import './Clothes.css'
import { assets } from '../../assets/assets'
import Header from '../../componets/Header/Header'
import AppContext from '../../contexts/AppContext'
import { useContext } from 'react'

function Clothes(){
    // let price =  500
      const price = useContext(AppContext)
      console.log(price)
  

    return(
        <>
         <Header />

       <h1 className='clothes'>Clothes</h1>
        <div className="features">
            {/* <div>
                <h1>Featured Products</h1>
            </div> */}
            <div className='product-list'>
                <div className="dresses">
                    <img src={assets.kurta} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.polo} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.nechHooded} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.dress} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.kurta} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                
            </div>
        </div>
        </>
    )
}
export default Clothes