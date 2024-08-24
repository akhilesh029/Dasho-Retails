import React from 'react'

import './Clothes.css'
import { assets } from '../../assets/assets'
import Header from '../../componets/Header/Header'
import {AppContext} from '../../context/AppContext'
import { useContext } from 'react'

const Clothes=()=>{
    // let price =  500
      const {price, name} = useContext(AppContext)
      console.log(price)
      console.log(name)
  
      const clothesdetails=()=>{
        window.open('/clothesdetails','_self')
    }

    //-----------
    // const contentDiv = document.getElementById('content');
    // const viewMoreButton = document.getElementById('view-more');

    // viewMoreButton.addEventListener('click', () => {
    //    contentDiv.style.height = 'auto';
    //     viewMoreButton.style.display = 'none';
        
    // });

    return(
        <>
         <Header />

       <h1 className='clothes'>Clothes</h1>
        <div id='content' className="features view-more">
          
            <div className='product-list'>
                <div onClick={clothesdetails}  className="dresses">
                    <img src={assets.kurta} alt="Not found" />
                    <h2>{name}</h2>
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
            <div className='product-list'>
                <div onClick={clothesdetails}  className="dresses">
                    <img src={assets.kurta} alt="Not found" />
                    <h2>{name}</h2>
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
            <div className='product-list'>
                <div onClick={clothesdetails}  className="dresses">
                    <img src={assets.kurta} alt="Not found" />
                    <h2>{name}</h2>
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
            <div className='product-list'>
                <div onClick={clothesdetails}  className="dresses">
                    <img src={assets.kurta} alt="Not found" />
                    <h2>{name}</h2>
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
            <button id='view-more' class="view-more">View More</button>
        </div>
        </>
    )
}
export default Clothes