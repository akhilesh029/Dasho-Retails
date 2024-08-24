import React, { useState } from 'react'
import './Cosmeticsdetails.css'
import Header from '../../../componets/Header/Header'
import { assets } from '../../../assets/assets'
import { AppContext } from '../../../context/AppContext'
import { useContext } from 'react'

const Cosmeticsdetails = () => {

    const {price, name} = useContext(AppContext)

    const [count, setCount] = useState(1);

    const increaseCount = ()=>{
        setCount(count=>count+1)
    }
    const decreaseCount = ()=>{
        if(count>1){
            setCount(count=>count-1)
        }
    }
   


  return (
    <>
    <Header />
    <div id="clothesdetails">
        <div className="image divs2">
            <img src={assets.cosm1} alt="" />
            <button>Buy Now</button>
            
        </div>
        
        <div className="details divs2">
            <h2>{name}</h2> 
            <span>Rs. {price}</span>

            <h3>Quantity</h3>
            <div className="quantity">
                <button onClick={decreaseCount}>-</button>
                <p>{count}</p>
                <button onClick={increaseCount}>+</button>
            </div>

            <div className="btn">
                <button id='bulkOrder'>Bulk Order</button>
                <button>Buy Now</button>
                {/* <span>for large Quantity</span> */}
            </div>

            <div className="apparels">
            <h2>R & R Apparels</h2>
            <button><p>View All Products</p></button>
            </div>
            <p>Sector 63, Noida, Uttar Pradesh</p>
            <p>GST -09AGFPD5851K1Z7</p>
            <p>Verified Supplier</p>
            <hr />
            <h2>Details</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, suscipit, in doloribus dignissimos id eveniet itaque obcaecati aut doloremque nostrum voluptatum dolore rem ducimus provident neque voluptate debitis enim deleniti!</p>
            <hr />
            <p>Fabric: Velvet</p>
            <p>Wash Care: Dry Clean Only</p>
            <p>Type: Kurta Set</p>
            <p>Color: Navy Blue</p>
            <p>Work: Embroidery</p>
            <p>Weight: 600g</p>
            <p>Dispatched in 3 days</p>
            <hr />

        </div>
    </div>
    </>
  )
}

export default Cosmeticsdetails