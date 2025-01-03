import './Navbar.css'
import { assets } from '../../assets/assets'
import Dropdown from '../Dropdown/Dropdown'
import Categories from '../Categories/Categories'

function Navbar(){
    return(
           <div className="categories">
          
                <ul className='navbar_list'>
                    <li><a href="#">Clothes</a></li>
                    <li><a href="#">Cosmetics</a></li>
                    <li><a href="#">Pharmaceuticals</a></li>
                    <li><a href="#">Pet Foods</a></li>
                    <li><a href="#">Electronics</a></li>
                    <li><a href="#">Books</a></li>
                    <li><a href="#">Fitness</a></li>
                    <li><a href="#">Toys</a></li>
                    {/* <li><a href="#">Mobile Accesories</a></li> */}
                </ul>
          
           </div>
           
    )
}

export default Navbar