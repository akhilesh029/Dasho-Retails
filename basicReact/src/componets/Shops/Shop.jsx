import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper React components
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules"; // Import Swiper modules
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Shop.css"; // Import your custom CSS
import placeholderImg from "../../assets/p1.jpeg"; // Placeholder image

const CardSlider = () => {
  const [trendingShops, setTrendingShops] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch trending shops from API
  useEffect(() => {
    fetch("http://localhost:3000/api/shops/trending") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setTrendingShops(data);
      })
      .catch(() => {
        setError("Failed to load trending shops");
      });
  }, []);

  // Function to handle card click and navigate to dynamic route
  const handleClick = (email) => {
    // console.log(email)
    navigate(`/shop/${email}`); // Navigate to a dynamic route based on the shop name
  };

  return (
    <div className="shop-container">
      <div className="slider-container">
        <h2 className="trending-shop">Trending Shops</h2>
        {error && <p className="error">{error}</p>}
        {trendingShops.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]} // Use the required Swiper modules
            spaceBetween={25} // Space between slides
            slidesPerView={4} // Number of cards to show at once
            navigation // Enable navigation buttons
            pagination={{ clickable: true }} // Enable pagination dots
            loop={true} // Enable looping
            autoplay={{ delay: 2500, disableOnInteraction: false }} // Enable auto-sliding
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
            {trendingShops
              .filter((shop) => shop.isTrending) // Filter shops with isTrending set to true
              .map((shop) => (
                <SwiperSlide key={shop._id}>
                  <div
                    onClick={() => handleClick(shop.email)}
                    className="slider-card"
                  >
                    <h2 className="card-title">{shop.businessName}</h2>
                    <img
                      src={
                        shop.shopImage
                          ? `http://localhost:3000/${shop.shopImage}`
                          : placeholderImg
                      }
                      alt={shop.businessName}
                      className="card-image"
                    />
                    <div className="text-decoration">
                      <p className="card-category">{shop.shopCategory}</p>
                      <p className="card-items">
                        Items Available: {shop.itemsAvailable || "N/A"}
                      </p>
                    </div>
                    <p className="card-description">
                      {shop.description || "No description available"}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <p>No trending shops available.</p>
        )}
      </div>
    </div>
  );
};

export default CardSlider;
