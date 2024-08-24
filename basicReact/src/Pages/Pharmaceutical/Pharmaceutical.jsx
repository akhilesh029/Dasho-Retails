import React from 'react'

import './Pharmaceutical.css'
import { assets } from '../../assets/assets'
import Header from '../../componets/Header/Header'
import {AppContext} from '../../context/AppContext'
import { useContext } from 'react'

const Pharmaceuticals=()=>{
    // let price =  500
      const {price, name} = useContext(AppContext)
      console.log(price)
      console.log(name)
  
      const pharmaceuticaldetails=()=>{
        window.open('/pharmaceuticaldetails','_self')
    }

    return(
        <>
         <Header />

       <h1 className='clothes'>Pharmcetical Products</h1>
        <div className="features">
          
            <div className='product-list'>
                <div onClick={pharmaceuticaldetails}  className="dresses">
                    <img src={assets.ph1} alt="Not found" />
                    <h2>{name}</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph2} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph3} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph4} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph5} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                
            </div>
            <div className='product-list'>
                <div onClick={pharmaceuticaldetails}  className="dresses">
                    <img src={assets.ph1} alt="Not found" />
                    <h2>{name}</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph2} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph3} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph4} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph5} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                
            </div>
            <div className='product-list'>
                <div onClick={pharmaceuticaldetails}  className="dresses">
                    <img src={assets.ph1} alt="Not found" />
                    <h2>{name}</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph2} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph3} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph4} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.ph5} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                
            </div>
            
        </div>
        </>
    )
}
export default Pharmaceuticals