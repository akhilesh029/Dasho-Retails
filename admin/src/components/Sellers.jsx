import React, { useState, useEffect } from "react";
import './sellers.css'
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import StoreIcon from "@mui/icons-material/Store";


const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Fetch sellers when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/shops")
      .then((response) => {
        setSellers(response.data);
      })
      .catch((err) => {
        setError("Failed to load sellers");
      });

    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        setProducts(response.data);
        // console.log(products)
      })
      .catch((err) => {
        setError("Failed to load products");
      });
  }, []);

  return (
    <Box
      sx={{ padding: "40px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}
      >
        Seller Dashboard
      </Typography>

      {error && (
        <div className="error" style={{ color: "red", textAlign: "center" }}>
          {error}
        </div>
      )}

      <Grid container spacing={3}>
        {sellers.length > 0 ? (
          sellers.map((seller) => (
            <Grid item xs={12} sm={6} md={4} key={seller._id}>
              <Card
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    height: "200px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    overflow: "hidden", // Ensures the image fits within the rounded corners
                  }}
                >
                  <img
                    src={`http://localhost:3000/${seller.shopImage}`}
                    alt={seller.shopCategory} // Make sure to add a descriptive alt text
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // Ensures the image covers the entire Box area
                      objectPosition: "center", // Centers the image within the Box
                    }}
                  />
                </Box>

                <CardContent>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      margin: "-30px auto 10px",
                      border: "2px solid white",
                    }}
                  >
                    <StoreIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {seller.businessName}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    gutterBottom
                  >
                    Category: {seller.shopCategory}
                  </Typography>
                  <Box sx={{ marginTop: "10px" }}>
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
                      <strong>Business Contact:</strong>{" "}
                      {seller.businessContactNumber}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <IconButton color="primary">
                      <EmailIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <PhoneIcon />
                    </IconButton>
                  </Box>

                  <div className="product-list" style={{ marginTop: "20px" }}>
                    <h4>Products by {seller.businessName}</h4>
                    {products.length > 0 ? (
                      products
                        .filter(
                          (product) => product.sellerEmail === seller.email
                        ) // Filter products by sellerEmail
                        .map((product) => (
                          <div
                            className="product-item"
                            key={product._id}
                            style={{ marginBottom: "15px" }}
                          >
                            <div className="product-info">
                              <p>
                                <strong>{product.itemName}</strong>
                              </p>
                              <p>Price: ${product.itemPrice}</p>
                              <p>Stock: {product.productCount}</p>
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
