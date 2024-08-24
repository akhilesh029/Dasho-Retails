import React from 'react'
import './FeaturedPro.css'
import { assets } from '../../assets/assets'

const FeaturedPro = () => {
  return (
    <>
   
    <h1 className='featuredProh1'>Featured Products</h1>
    <div className="horizontal-scroll featuredPro">
         <div className="tags">
           
                <img src={assets.f1} alt="" />
           
         </div>
         <div className="tags">
            
                <img src={assets.f2} alt="" />
           
         </div>
         <div className="tags">
            
                <img src={assets.f3} alt="" />
           
         </div>
         <div className="tags">
            
                <img src={assets.f4} alt="" />
            
         </div>
         <div className="tags">
         
                <img src={assets.f5} alt="" />
            
         </div>
         <div className="tags">
            
                <img src={assets.f6} alt="" />
            
         </div>
         <div className="tags">
           
                <img src={assets.f4} alt="" />
         
         </div>
         <div className="tags">
            
                <img src={assets.f6} alt="" />
            
         </div>
         <div className="tags">
            
                <img src={assets.f1} alt="" />
           
         </div>
         <div className="tags">
            
                <img src={assets.f3} alt="" />
           
         </div>

    </div>
    </>
  )
}

export default FeaturedPro