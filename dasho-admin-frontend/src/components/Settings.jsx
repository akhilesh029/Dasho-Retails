import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Setting.css";

const Settings = () => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fix image path for "public/Images/..."
  const fixImage = (img) => {
    if (!img) return "";
    const clean = img.replace(/\\/g, "/");
    return `${BASE_URL}/${clean}`;
  };

  // Fetch all shops
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/shops`)
      .then((res) => setShops(res.data))
      .catch(() => setError("Failed to load shops"));
  }, []);

  // Toggle Trending Status
  const toggleTrending = async (shopId, currentState) => {
    const endpoint = currentState ? "removeTrending" : "addTrending";

    try {
      await axios.post(`${BASE_URL}/api/shops/${shopId}/${endpoint}`);

      setShops((prev) =>
        prev.map((s) =>
          s._id === shopId ? { ...s, isTrending: !currentState } : s
        )
      );
    } catch {
      setError("Failed to update trending status");
    }
  };

  return (
    <div className="settings-container">
      <h2 className="page-title">Trending Shop Settings</h2>

      {error && <div className="error-banner">{error}</div>}

      <div className="shop-grid">
        {shops.map((shop) => (
          <div
            className={`shop-card ${shop.isTrending ? "trending-active" : ""}`}
            key={shop._id}
          >
            <div className="shop-img-box">
              <img
                src={fixImage(shop.shopImage)}
                alt={shop.businessName}
                className="shop-img"
              />

              {shop.isTrending && <span className="badge-trending">Trending</span>}
            </div>

            <div className="shop-info">
              <h3 className="shop-title">{shop.businessName}</h3>
              <p className="shop-category">{shop.shopCategory}</p>

              <button
                className={`toggle-btn ${shop.isTrending ? "remove" : "add"}`}
                onClick={() => toggleTrending(shop._id, shop.isTrending)}
              >
                {shop.isTrending ? "Remove from Trending" : "Add to Trending"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
