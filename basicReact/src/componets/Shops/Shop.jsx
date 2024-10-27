import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  // Function to handle card click and navigate to dynamic route
  const handleClick = (card) => {
    const formattedShopName = card.shopName.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens
    navigate(`/shop/${formattedShopName}`);  // Navigate to a dynamic route based on the shop name
   };


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
            <div onClick={()=>handleClick(card)} className="slider-card">
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
