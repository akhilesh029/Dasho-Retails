import './mainDiv.css'
import {assets} from '../../../assets/assets'

function Maindiv(){
    return(
        <>
        <div className="main">
            <div className="left child">
                <h1>Discover Top Brands </h1>
                <h2>This Festival on IndeaMart Shopping</h2>
            </div>
            <div className="right child">
                <div className="grid">
                    <img src={assets.gift} alt="" />
                </div>
                <div className="grid">
                <img src={assets.jewellery} alt="" />
                </div>
                <div className="grid">
                <img src={assets.ethnic} alt="" />
                </div>
                <div className="grid">
                <img src={assets.decorative} alt="" />
                </div>
            </div>
        </div>
        </>
    )
}

export default Maindiv