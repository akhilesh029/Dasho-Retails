import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Grid, Avatar, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import StoreIcon from '@mui/icons-material/Store';

const Sellers = () => {
    const [sellers, setSellers] = useState([]);
    const [error, setError] = useState('');

    // Fetch sellers when component mounts
    useEffect(() => {
        axios.get('http://localhost:3000/api/shops')
            .then((response) => {
                setSellers(response.data);
            })
            .catch((err) => {
                setError('Failed to load sellers');
            });
    }, []);

    return (
        <Box sx={{ padding: '40px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                Seller Dashboard
            </Typography>
            
            {error && <div className="error" style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

            <Grid container spacing={3}>
                {sellers.length > 0 ? (
                    sellers.map((seller) => (
                        <Grid item xs={12} sm={6} md={4} key={seller._id}>
                            <Card sx={{ borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                <Box
                                    sx={{
                                        height: '200px',
                                        backgroundImage: `url(http://localhost:3000/${seller.shopImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderTopLeftRadius: '10px',
                                        borderTopRightRadius: '10px',
                                    }}
                                />
                                <CardContent>
                                    <Avatar
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            margin: '-30px auto 10px',
                                            border: '2px solid white',
                                        }}
                                    >
                                        <StoreIcon />
                                    </Avatar>
                                    <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                                        {seller.businessName}
                                    </Typography>
                                    <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                                        Category: {seller.shopCategory}
                                    </Typography>
                                    <Box sx={{ marginTop: '10px' }}>
                                        <Typography variant="body2">
                                            <strong>Owner:</strong> {seller.ownerName}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Email:</strong> {seller.email}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Contact:</strong> {seller.contactNumber}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Business Contact:</strong> {seller.businessContactNumber}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <IconButton color="primary">
                                            <EmailIcon />
                                        </IconButton>
                                        <IconButton color="primary">
                                            <PhoneIcon />
                                        </IconButton>
                                    </Box>

                                    <div className="product-list" style={{ marginTop: '20px' }}>
                                        <h4>Products by {seller.businessName}</h4>
                                        {seller.products && seller.products.length > 0 ? (
                                            seller.products.map((product) => (
                                                <div className="product-item" key={product.id} style={{ marginBottom: '15px' }}>
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
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <p>No sellers found</p>
                )}
            </Grid>
        </Box>
    );
};

export default Sellers;
