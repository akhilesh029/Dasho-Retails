import React from 'react'

import './Cosmetics.css'
import { assets } from '../../../assets/assets'
import Header from '../../../componets/Header/Header'
import { AppContext } from '../../../context/AppContext'
import { useContext } from 'react'
import Navbar from '../../../componets/Navbar/Navbar'

const Cosmetics=()=>{
    // let price =  500
      const {price, name} = useContext(AppContext)
      console.log(price)
      console.log(name)
  
      const cosmeticdetails=()=>{
        window.open('/cosmeticsdetails','_self')
    }

    return(
        <>
         <Header />
         <Navbar />
<div className="mt">
<h1 className='clothes'>Cosmetics</h1>
        <div className="features">
          
            <div className='product-list'>
                <div onClick={cosmeticdetails} className="dresses">
                    <img src={assets.cosm1} alt="Not found" />
                    <h2>{name}</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                {/* <div className="dresses">
                    <img src={assets.cosm2} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div> */}
                <div className="dresses">
                    <img src={assets.cosm3} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.cosm4} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.cosm5} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                
            </div>
            <div className='product-list'>
                <div onClick={cosmeticdetails}  className="dresses">
                    <img src={assets.cosm1} alt="Not found" />
                    <h2>{name}</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.cosm2} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                {/* <div className="dresses">
                    <img src={assets.cosm3} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div> */}
                <div className="dresses">
                    <img src={assets.cosm4} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.cosm5} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                
            </div>
            <div className='product-list'>
                <div onClick={cosmeticdetails}  className="dresses">
                    <img src={assets.cosm1} alt="Not found" />
                    <h2>{name}</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.cosm2} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="dresses">
                    <img src={assets.cosm3} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                {/* <div className="dresses">
                    <img src={assets.cosm4} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div> */}
                <div className="dresses">
                    <img src={assets.cosm5} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                
            </div>
          
           
        </div>
</div>
        
        </>
    )
}
export default Cosmetics