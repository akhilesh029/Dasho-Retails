import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
} from '@mui/material';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editProduct, setEditProduct] = useState(null); // Modal data
  const [open, setOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Image URL Fixer
  const fixImage = (path) => {
    if (!path) return "";
    let clean = path.replace(/\\/g, "/").replace(/^\/+/, "");
    if (clean.startsWith("public/Images")) {
      return `${BASE_URL}/${clean}`;
    }
    return `${BASE_URL}/public/Images/${clean}`;
  };

  // Fetch products
  const fetchProducts = () => {
    axios
      .get(`${BASE_URL}/showproduct`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        setError("Failed to load products");
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // === DELETE PRODUCT ===
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/products/remove/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      alert("Delete failed!");
    }
  };

  // === OPEN EDIT MODAL ===
  const handleEditOpen = (product) => {
    setEditProduct({ ...product });
    setOpen(true);
  };

  // === CLOSE MODAL ===
  const handleClose = () => {
    setOpen(false);
    setEditProduct(null);
  };

  // === SAVE EDITED PRODUCT ===
  const handleSave = async () => {
    try {
      await axios.put(`${BASE_URL}/api/products/update/${editProduct._id}`, editProduct);

      alert("Product updated successfully");
      handleClose();
      fetchProducts();
    } catch (error) {
      alert("Update failed!");
    }
  };

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Time Limit</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Avatar
                    src={fixImage(product.itemImage)}
                    variant="rounded"
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>

                <TableCell>{product.itemName}</TableCell>
                <TableCell>{product.itemDescription}</TableCell>

                <TableCell>₹{product.itemPrice}</TableCell>

                <TableCell>
                  {product.timeLimit} {product.timeUnit}
                </TableCell>

                <TableCell>
                  {new Date(product.expiryDate).toLocaleString()}
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    color={product.isActive ? "primary" : "error"}
                    size="small"
                  >
                    {product.isActive ? "Active" : "Expired"}
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditOpen(product)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* ===== EDIT MODAL ===== */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>

        <DialogContent dividers>
          <TextField
            label="Item Name"
            fullWidth
            margin="dense"
            value={editProduct?.itemName || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, itemName: e.target.value })
            }
          />

          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={editProduct?.itemDescription || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, itemDescription: e.target.value })
            }
          />

          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="dense"
            value={editProduct?.itemPrice || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, itemPrice: e.target.value })
            }
          />

          <TextField
            label="Stock Count"
            type="number"
            fullWidth
            margin="dense"
            value={editProduct?.productCount || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, productCount: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsTable;
