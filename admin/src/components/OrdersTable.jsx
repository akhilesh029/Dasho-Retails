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
} from '@mui/material';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  // Fetch orders from API
  useEffect(() => {
    axios
      .get('http://localhost:3000/orders') // Replace with your API endpoint
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        setError('Failed to load orders');
      });
  }, []);

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Orders List
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Buyer Name</TableCell>
              <TableCell>Shop Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.productDetails.itemName}</TableCell>
                <TableCell>{order.buyerDetails.name}</TableCell>
                <TableCell>{order.shopName}</TableCell>
                <TableCell>${order.productDetails.itemPrice}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={order.status === 'Completed' ? 'success' : 'error'}
                    size="small"
                  >
                    {order.status}
                  </Button>
                </TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" size="small">
                    View
                  </Button>
                  <Button variant="outlined" color="error" size="small" sx={{ ml: 1 }}>
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersTable;
