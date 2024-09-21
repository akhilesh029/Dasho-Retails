// import React,{useState ,useEffect, useRef}from 'react'
// import "./Shop.css"
// import {shops} from "../../assets/assets"
// import img from "../../assets/p1.jpeg"
// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';


// const Shop = () => {
//   const [scrollIndex, setScrollIndex] = useState(0); // Track current scroll position
//   const shopListRef = useRef(null);

//   const handleScrollRight = () => {
//     if (shopListRef.current) {
//       const maxScroll = shopListRef.current.scrollWidth - shopListRef.current.clientWidth;
//       const scrollAmount = shopListRef.current.clientWidth;

//       // Calculate the next scroll position
//       const newIndex = Math.min(scrollIndex + scrollAmount, maxScroll);

//       shopListRef.current.scrollTo({
//         left: newIndex,
//         behavior: 'smooth', // Smooth scrolling effect
//       });

//       setScrollIndex(newIndex); // Update the scroll index
//     }
//   };

//   const handleScrollLeft = () => {
//     if (shopListRef.current) {
//       const scrollAmount = shopListRef.current.clientWidth;

//       // Calculate the previous scroll position
//       const newIndex = Math.max(scrollIndex - scrollAmount, 0);

//       shopListRef.current.scrollTo({
//         left: newIndex,
//         behavior: 'smooth', // Smooth scrolling effect
//       });

//       setScrollIndex(newIndex); // Update the scroll index
//     }
//   };

//   return (
//     <>  
//     <h2 className='trending-shop'>Trending shops</h2>
//     {/* <div className='shop-container' >
//     <ShopItem shopListRef={shopListRef} handleScrollRight={handleScrollRight} handleScrollLeft={handleScrollLeft} />
//     </div> */}
     



//     </>
//   )
// }

// export default Shop

// function ShopItem({ shopListRef, handleScrollRight, handleScrollLeft }) {

//   return(
//        <div className='containerr swiper'>
//           <div className='card-wrapperr'>
//              <ul className='card-list swiper-wrapper'>
//                <li className='card-item  swiper-slide'>
//                 <a href="#" className='card-link'>
//                   <img src={img} alt="" className='card-image' />
//                   <p className='badge'>Developer</p>
//                   <h2 className='card-title'>This is shivam</h2>
//                   <button className="card-button material-symbols-outlined">
//                     arrow_forward
// </button>
//                 </a>
//                </li>
//                <li className='card-item  swiper-slide'>
//                 <a href="#" className='card-link'>
//                   <img src={img} alt="" className='card-image' />
//                   <p className='badge'>Developer</p>
//                   <h2 className='card-title'>This is s</h2>
//                   <button className="card-button material-symbols-outlined">
//                     arrow_forward
// </button>
//                 </a>
//                </li>
//                <li className='card-item swiper-slide'>
//                 <a href="#" className='card-link'>
//                   <img src={img} alt="" className='card-image' />
//                   <p className='badge'>Developer</p>
//                   <h2 className='card-title'>This is sh</h2>
//                   <button className="card-button material-symbols-outlined">
//                     arrow_forward
// </button>
//                 </a>
//                </li>
//                <li className='card-item  swiper-slide'>
//                 <a href="#" className='card-link'>
//                   <img src={img} alt="" className='card-image' />
//                   <p className='badge'>Developer</p>
//                   <h2 className='card-title'>This is shi</h2>
//                   <button className="card-button material-symbols-outlined">
//                     arrow_forward
// </button>
//                 </a>
//                </li>
//                <li className='card-item  swiper-slide'>
//                 <a href="#" className='card-link'>
//                   <img src={img} alt="" className='card-image' />
//                   <p className='badge'>Developer</p>
//                   <h2 className='card-title'>This is shiv</h2>
//                   <button className="card-button material-symbols-outlined">
//                     arrow_forward
// </button>
//                 </a>
//                </li>
//                <li className='card-item  swiper-slide'>
//                 <a href="#" className='card-link'>
//                   <img src={img} alt="" className='card-image' />
//                   <p className='badge'>Developer</p>
//                   <h2 className='card-title'>This is yash</h2>
//                   <button className="card-button material-symbols-outlined">
//                     arrow_forward
// </button>
//                 </a>
//                </li>
//                <li className='card-item  swiper-slide'>
//                 <a href="#" className='card-link'>
//                   <img src={img} alt="" className='card-image' />
//                   <p className='badge'>Developer</p>
//                   <h2 className='card-title'>This is nishu</h2>
//                   <button className="card-button material-symbols-outlined">
//                     arrow_forward
// </button>
//                 </a>
//                </li>
//              </ul>

//              <div className="swiper-pagination"></div>
//              <div className="lbtn swiper-button-prev" onClick={handleScrollLeft}> </div> 
//              <div className="rbtn swiper-button-next" onClick={handleScrollRight}></div>
//           </div>
//        </div>

//   )
// }

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'; // Import Swiper modules
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Shop.css'; // Import your custom CSS
import img from "../../assets/p1.jpeg"
import {cards} from "../../assets/assets"


const CardSlider = () => {
  return (
    <div className='shop-container' >
    <div className="slider-container">
    <h2 className='trending-shop'>Trending shops</h2>
      <Swiper
        modules={[Navigation, Pagination, A11y]} // Use the required Swiper modules
        spaceBetween={25} // Space between slides
        slidesPerView={3} // Number of cards to show at once
        navigation // Enable navigation buttons
        pagination={{ clickable: true }} // Enable pagination dots
        loop={true} // Enable looping
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }} // Responsive breakpoints for different screen sizes
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="slider-card">
              <h2 className="card-title">{card.shopName}</h2>
              <img src={img} alt="" className='card-image' />
              <div className='text-decoration'> 
                 <p className="card-category">{card.category}</p>
                 <p className="card-items">Items Available: {card.items_available}</p>  
              </div>
              <p className="card-description">{card.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default CardSlider;
