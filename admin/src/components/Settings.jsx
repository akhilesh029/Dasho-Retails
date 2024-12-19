import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Setting.css"

const Settings = () => {
    const [shops, setShops] = useState([]);
    const [trendingShops, setTrendingShops] = useState([]);
    const [error, setError] = useState('');

    // Fetch all shops and trending shops when component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/shops')
            .then((response) => {
                setShops(response.data.shops);
                setTrendingShops(response.data.trendingShops);
            })
            .catch((err) => {
                setError('Failed to load shops');
            });
    }, []);

    // Handle adding a shop to trending
    const addTrendingShop = (shopId) => {
        axios.post(`http://localhost:5000/api/shops/${shopId}/addTrending`)
            .then(() => {
                setTrendingShops((prevTrendingShops) => [
                    ...prevTrendingShops,
                    shops.find(shop => shop.id === shopId),
                ]);
            })
            .catch((err) => {
                setError('Failed to add shop to trending');
            });
    };

    // Handle removing a shop from trending
    const removeTrendingShop = (shopId) => {
        axios.post(`http://localhost:5000/api/shops/${shopId}/removeTrending`)
            .then(() => {
                setTrendingShops((prevTrendingShops) =>
                    prevTrendingShops.filter(shop => shop.id !== shopId)
                );
            })
            .catch((err) => {
                setError('Failed to remove shop from trending');
            });
    };

    return (
        <div className="content">
            <h2>Settings</h2>
            {error && <div className="error">{error}</div>}

            <div className="card">
                <div className="card-header">Manage Trending Shops</div>
                <div className="card-body">
                    <h4>All Shops</h4>
                    <div className="shop-list">
                        {shops.length > 0 ? (
                            shops.map((shop) => (
                                <div className="shop-item" key={shop.id}>
                                    <div className="shop-info">
                                        <p><strong>{shop.shopName}</strong></p>
                                        <p>{shop.description}</p>
                                    </div>
                                    {trendingShops.some(trendingShop => trendingShop.id === shop.id) ? (
                                        <button
                                            onClick={() => removeTrendingShop(shop.id)}
                                            className="btn-remove"
                                        >
                                            Remove from Trending
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => addTrendingShop(shop.id)}
                                            className="btn-add"
                                        >
                                            Add to Trending
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No shops available.</p>
                        )}
                    </div>

                    <h4>Trending Shops</h4>
                    <div className="shop-list">
                        {trendingShops.length > 0 ? (
                            trendingShops.map((shop) => (
                                <div className="shop-item" key={shop.id}>
                                    <div className="shop-info">
                                        <p><strong>{shop.shopName}</strong></p>
                                        <p>{shop.description}</p>
                                    </div>
                                    <button
                                        onClick={() => removeTrendingShop(shop.id)}
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
