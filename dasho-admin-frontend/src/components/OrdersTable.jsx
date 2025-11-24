import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Avatar,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [openOrder, setOpenOrder] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fixing image path for your DB: public\Images\file_xx.jpg
  const fixImage = (path) => {
    if (!path) return "";
    let clean = path.replace(/\\/g, "/");
    if (clean.startsWith("public/Images")) {
      return `${BASE_URL}/${clean}`;
    }
    return `${BASE_URL}/public/Images/${clean}`;
  };

  // Fetch orders from API
  const fetchOrders = () => {
    axios
      .get(`${BASE_URL}/orders`)
      .then((res) => setOrders(res.data))
      .catch(() => setError("Failed to load orders"));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Cancel ENTIRE order
  const cancelOrder = async (orderId) => {
    if (!confirm("Cancel entire order?")) return;
    try {
      await axios.delete(`${BASE_URL}/orders/cancel/${orderId}`);
      alert("Order cancelled");
      fetchOrders();
    } catch (err) {
      alert("Failed to cancel order");
    }
  };

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" gutterBottom>
        Orders List
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Cancel</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <TableRow>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.customer?.name || "NA"}</TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>

                  <TableCell>
                    <IconButton onClick={() => setOpenOrder(openOrder === order._id ? null : order._id)}>
                      {openOrder === order._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => setViewOrder(order)}
                    >
                      View
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>

                {/* ORDER ITEMS COLLAPSIBLE */}
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={openOrder === order._id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Order Items
                        </Typography>

                        {order.items.map((item, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              padding: "10px",
                              borderBottom: "1px solid #ccc"
                            }}
                          >
                            <Avatar
                              src={fixImage(item.itemImage)}
                              variant="rounded"
                              sx={{ width: 60, height: 60 }}
                            />

                            <Box>
                              <Typography><strong>{item.itemName}</strong></Typography>
                              <Typography>₹{item.itemPrice}</Typography>
                              <Typography>Qty: {item.quantity}</Typography>
                              <Typography>Status: {item.status}</Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ---------------- VIEW ORDER MODAL ---------------- */}
      <Dialog open={!!viewOrder} onClose={() => setViewOrder(null)} fullWidth maxWidth="sm">
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {viewOrder && (
            <>
              <Typography><strong>Customer:</strong> {viewOrder.customer?.name}</Typography>
              <Typography><strong>Email:</strong> {viewOrder.customer?.email}</Typography>
              <Typography><strong>Total Amount:</strong> ₹{viewOrder.totalAmount}</Typography>

              <Typography sx={{ mt: 2 }} variant="h6">Items:</Typography>
              {viewOrder.items.map((item, idx) => (
                <Box key={idx} sx={{ mt: 1, display: "flex", gap: 2 }}>
                  <Avatar
                    src={fixImage(item.itemImage)}
                    variant="rounded"
                    sx={{ width: 70, height: 70 }}
                  />
                  <Box>
                    <Typography><strong>{item.itemName}</strong></Typography>
                    <Typography>₹{item.itemPrice}</Typography>
                    <Typography>Qty: {item.quantity}</Typography>
                    <Typography>Status: {item.status}</Typography>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOrder(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdersTable;
