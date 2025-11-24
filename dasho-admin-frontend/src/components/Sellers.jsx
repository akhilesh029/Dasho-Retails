import React, { useState, useEffect } from "react";
import "./sellers.css";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Chip,
  Button,
  Collapse
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import StoreIcon from "@mui/icons-material/Store";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [openProducts, setOpenProducts] = useState({}); // toggle product section

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Universal path fixer
  const getImageURL = (path) => {
    if (!path) return "";

    let cleaned = path.replace(/\\/g, "/"); // Fix Windows \
    cleaned = cleaned.replace(/^\/+/, "");  // remove leading slash

    // If DB has: public/Images/file.jpg
    if (cleaned.startsWith("public/Images")) {
      return `${BASE_URL}/${cleaned}`;
    }

    // fallback (just filename or Images/file.jpg)
    return `${BASE_URL}/public/Images/${cleaned}`;
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/shops`)
      .then((res) => setSellers(res.data))
      .catch(() => setError("Failed to load sellers"));

    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => {
        console.log("PRODUCTS:", res.data); // Debug
        setProducts(res.data);
      })
      .catch(() => setError("Failed to load products"));
  }, []);

  const toggleProducts = (id) => {
    setOpenProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Box sx={{ padding: "40px", backgroundColor: "#f8f9fb", minHeight: "100vh" }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
        Sellers & Their Products
      </Typography>

      {error && <Typography sx={{ color: "red", textAlign: "center" }}>{error}</Typography>}

      <Grid container spacing={3}>
        {sellers.map((seller) => {
          const sellerProducts = products.filter(
            (product) => product.sellerEmail === seller.email
          );

          return (
            <Grid item xs={12} sm={6} md={4} key={seller._id}>
              <Card
                sx={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 6px 22px rgba(0,0,0,0.12)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* Banner */}
                <Box sx={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={getImageURL(seller.shopImage)}
                    alt={seller.shopCategory}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <CardContent>
                  {/* Avatar */}
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      margin: "-40px auto 10px",
                      border: "3px solid white",
                      backgroundColor: "#1976d2",
                    }}
                  >
                    <StoreIcon sx={{ fontSize: 32 }} />
                  </Avatar>

                  <Typography variant="h6" align="center" fontWeight="bold">
                    {seller.businessName}
                  </Typography>

                  <Typography align="center" color="text.secondary">
                    {seller.shopCategory}
                  </Typography>

                  {/* Seller Info */}
                  <Box mt={1}>
                    <Typography variant="body2"><strong>Owner:</strong> {seller.ownerName}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {seller.email}</Typography>
                    <Typography variant="body2"><strong>Contact:</strong> {seller.contactNumber}</Typography>
                  </Box>

                  {/* Icons */}
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1 }}>
                    <IconButton color="primary"><EmailIcon /></IconButton>
                    <IconButton color="primary"><PhoneIcon /></IconButton>
                  </Box>

                  {/* View Products Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, textTransform: "none", borderRadius: "10px" }}
                    onClick={() => toggleProducts(seller._id)}
                  >
                    {openProducts[seller._id] ? "Hide Products" : "View Products"}
                  </Button>

                  {/* Collapsible Product List */}
                  <Collapse in={openProducts[seller._id]} timeout="auto" unmountOnExit>
                    <Box mt={2}>
                      {sellerProducts.length > 0 ? (
                        <Grid container spacing={1}>
                          {sellerProducts.map((product) => (
                            <Grid item xs={12} key={product._id}>
                              <Card
                                sx={{
                                  padding: "10px",
                                  borderRadius: "10px",
                                  display: "flex",
                                  gap: 2,
                                  alignItems: "center",
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                }}
                              >
                                <img
                                  src={getImageURL(product.itemImage)}
                                  alt={product.itemName}
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                  }}
                                />

                                <Box>
                                  <Typography fontWeight="600">{product.itemName}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    ₹{product.itemPrice}
                                  </Typography>

                                  <Chip
                                    label={`Stock: ${product.productCount}`}
                                    size="small"
                                    sx={{
                                      mt: 1,
                                      backgroundColor: "#e3f2fd",
                                      color: "#1976d2",
                                    }}
                                  />
                                </Box>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Typography>No products uploaded.</Typography>
                      )}
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Sellers;
