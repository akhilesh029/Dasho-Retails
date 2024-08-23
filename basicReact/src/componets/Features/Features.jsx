import './Features.css'
import { assets } from '../../assets/assets'



function Features(){
    let price =  2675

  
    return(
        <>
        <div className="features">
            <div>
                <h1>Featured Products</h1>
            </div>
            <div className='product-list'>
                <div className="products">
                    <img src={assets.powder} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="products">
                    <img src={assets.powder} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="products">
                    <img src={assets.powder} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="products">
                    <img src={assets.powder} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                <div className="products">
                    <img src={assets.powder} alt="Not found" />
                    <h2>Powder Pack Duo Front-load</h2>
                    <p>Hindustan Unilever Limited</p>
                    <span>Rs. {price}</span>
                </div>
                
            </div>
        </div>
        </>
    )
}
export default Features