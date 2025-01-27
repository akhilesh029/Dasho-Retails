import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import "./SellerOrderPage.css";

const SellerOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const sellerToken = localStorage.getItem("authToken");
      console.log(sellerToken)

      if (!sellerToken) {
        alert("Please log in as a seller.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/orders/seller", {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        });

        setOrders(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    const sellerToken = localStorage.getItem("sellerToken");

    if (!sellerToken) {
      alert("Please log in as a seller.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="sellerOrderPage">
      <h1>Seller Order Dashboard</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div>
          {orders.length > 0 ? (
            <ul className="orderList">
              {orders.map((order) => (
                <li key={order._id} className="orderItem">
                  <div className="orderDetails">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Customer:</strong> {order.customerId.name}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total Amount:</strong> ₹ {order.totalAmount}</p>
                    <div className="orderItems">
                      {order.items.map((item) => (
                        <div key={item.id} className="orderItemDetails">
                          <p>{item.itemName} (x{item.quantity})</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="statusButtons">
                    <button
                      className="statusButton"
                      onClick={() => updateOrderStatus(order._id, "Shipped")}
                    >
                      <FaCheck /> Shipped
                    </button>
                    <button
                      className="statusButton"
                      onClick={() => updateOrderStatus(order._id, "Cancelled")}
                    >
                      <FaTimes /> Cancelled
                    </button>
                    <button
                      className="statusButton"
                      onClick={() => updateOrderStatus(order._id, "Delivered")}
                    >
                      <FaExclamationTriangle /> Delivered
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerOrderPage;
