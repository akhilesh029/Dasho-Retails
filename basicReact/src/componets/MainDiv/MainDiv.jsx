import './mainDiv.css'
import {assets} from '../../assets/assets'

function Maindiv(){

    //for demo
const handleClick=()=>{
    window.open('https://shopping.indiamart.com/search.php?ss=home+decor','_self')
}

const gift=(e)=>{
    e.stopPropagation(); // to stop parent div
    window.open('https://shopping.indiamart.com/search.php?ss=gift+items','_self')
}

    return(
        <>
        <div onClick={handleClick}  className="main">
            <div className="left child">
                <h1>Discover Top Brands </h1>
                <h2>This Festival on Dasho</h2>
            </div>
            <div className="right child">
                <div onClick={gift} className="grid">
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