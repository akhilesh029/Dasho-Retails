import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sellers = () => {
    const [sellers, setSellers] = useState([]);
    const [error, setError] = useState('');

    // Fetch sellers when component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/sellers')
            .then((response) => {
                setSellers(response.data);
            })
            .catch((err) => {
                setError('Failed to load sellers');
            });
    }, []);

    return (
        <div className="content">
            <h2>Sellers</h2>
            {error && <div className="error">{error}</div>}

            <div className="card">
                <div className="card-header">All Sellers</div>
                <div className="card-body">
                    <div className="seller-list">
                        {sellers.length > 0 ? (
                            sellers.map((seller) => (
                                <div className="seller-item" key={seller.id}>
                                    <div className="seller-info">
                                        <h3>{seller.name}</h3>
                                        <p>Shop: {seller.shopName}</p>
                                        <p>Contact: {seller.contactInfo}</p>
                                        <p>Registration Date: {new Date(seller.registrationDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="product-list">
                                        <h4>Products by {seller.shopName}</h4>
                                        {seller.products && seller.products.length > 0 ? (
                                            seller.products.map((product) => (
                                                <div className="product-item" key={product.id}>
                                                    <div className="product-info">
                                                        <p><strong>{product.name}</strong></p>
                                                        <p>Price: ${product.price}</p>
                                                        <p>Stock: {product.stock}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No products uploaded by this seller.</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No sellers found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sellers;
