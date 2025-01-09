import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Setting.css";

const Settings = () => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");

  // Fetch all shops when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/shops")
      .then((response) => {
        setShops(response.data);
      })
      .catch(() => {
        setError("Failed to load shops");
      });
  }, []);

  // Handle adding a shop to trending
  const addTrendingShop = (shopId) => {
    axios
      .post(`http://localhost:3000/api/shops/${shopId}/addTrending`)
      .then(() => {
        setShops((prevShops) =>
          prevShops.map((shop) =>
            shop._id === shopId ? { ...shop, isTrending: true } : shop
          )
        );
        alert("Shop is now added to trending successfully!");
      })
      .catch(() => {
        setError("Failed to add shop to trending");
      });
  };

  // Handle removing a shop from trending
  const removeTrendingShop = (shopId) => {
    axios
      .post(`http://localhost:3000/api/shops/${shopId}/removeTrending`)
      .then(() => {
        setShops((prevShops) =>
          prevShops.map((shop) =>
            shop._id === shopId ? { ...shop, isTrending: false } : shop
          )
        );
        alert("Shop is now removed from trending successfully!");
      })
      .catch(() => {
        setError("Failed to remove shop from trending");
      });
  };

  return (
    <div className="content">
      <h2>Settings</h2>
      {error && <div className="error">{error}</div>}

      <div className="card">
        <div className="card-header">Manage Trending Shops</div>
        <div className="card-body">
          {/* Section for all shops */}
          <div className="shop-list">
            <h4>All Shops</h4>
            {shops.length > 0 ? (
              shops
                .filter((shop) => !shop.isTrending) // Non-trending shops
                .map((shop) => (
                  <div className="shop-item" key={shop._id}>
                    <div className="shop-info">
                      <p>
                        <strong>{shop.businessName}</strong>
                      </p>
                      <p>{shop.shopCategory}</p>
                      {/* Display shop image */}
                      {shop.shopImage && (
                        <img
                          src={`http://localhost:3000/${shop.shopImage}`} // Assuming the image path is relative to the server
                          alt={shop.businessName}
                          className="shop-image"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => addTrendingShop(shop._id)}
                      className="btn-add"
                    >
                      Add to Trending
                    </button>
                  </div>
                ))
            ) : (
              <p>No shops available.</p>
            )}
          </div>

          {/* Section for trending shops */}
          <div className="shop-list">
            <h4>Trending Shops</h4>
            {shops.length > 0 ? (
              shops
                .filter((shop) => shop.isTrending) // Trending shops
                .map((shop) => (
                  <div className="shop-item" key={shop._id}>
                    <div className="shop-info">
                      <p>
                        <strong>{shop.businessName}</strong>
                      </p>
                      <p>{shop.shopCategory}</p>
                      {/* Display shop image */}
                      {shop.shopImage && (
                        <img
                          src={`http://localhost:3000/${shop.shopImage}`} // Assuming the image path is relative to the server
                          alt={shop.businessName}
                          className="shop-image"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => removeTrendingShop(shop._id)}
                      className="btn-remove"
                    >
                      Remove from Trending
                    </button>
                  </div>
                ))
            ) : (
              <p>No trending shops.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
