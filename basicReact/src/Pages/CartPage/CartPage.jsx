import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import "./CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState(() => {
    // Retrieve cart from localStorage or initialize as an empty array
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [total, setTotal] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const [customer, setCustomer] = useState(null);

  const deliveryCharge = 50;
  const shippingCharge = 20;
  const tax = 10;

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const token = localStorage.getItem("authToken"); // OAuth token stored after login
        if (!token) {
          alert("Please log in to proceed.");
          return;
        }

        const response = await axios.get("http://localhost:3000/customer/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response : ", response)
        // setCustomerId(response.data);
        setCustomer(response.data)
        console.log(response)
      } catch (error) {
        console.error("Error fetching customer details:", error);
        alert("Failed to fetch customer details. Please log in again.");
      }
    };

    fetchCustomerDetails();
  }, []);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update cart in localStorage
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    updateCart(updatedCart);
  };

  const handlePlaceOrder = async () => {
    const totalAmount =
      cart.reduce((total, item) => total + item.itemPrice * item.quantity, 0) +
      deliveryCharge +
      shippingCharge +
      tax;

    if (!customer) {
      alert("Unable to place order. Customer information is missing.");
      return;
    }

   
    const orderData = {
      customer: {
        customerId: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        address1: customer.address1,
        address2: customer.address2,
        pinCode: customer.pinCode,
      },
      items: cart.map((item) => ({
        id: item.id,
        itemImage: item.itemImage,
        productId: item.productId,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        quantity: item.quantity,
      })),
      totalAmount,
    };
    // const orderData = {
    //   customerId,
    //   items: cart.map((item) => ({
    //     id: item.id,
    //     productId: item.productId,
    //     itemName: item.itemName,
    //     itemPrice: item.itemPrice,
    //     quantity: item.quantity,
    //   })),
    //   totalAmount,
    // };
console.log(orderData)
    try {
      const response = await axios.post("http://localhost:3000/orders", orderData);
      console.log("Order placed:", response.data);

      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="cartPage">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul className="cartList">
            {cart.map((item) => (
              <li key={item.productId} className="cartItem">
                <img
                  src={`http://localhost:3000/${item.itemImage}`}
                  alt={item.itemName}
                  className="cartImage"
                />
                <div className="cartDetails">
                  <p className="itemName">{item.itemName}</p>
                  <p className="itemPrice">₹ {item.itemPrice}</p>
                </div>
                <div className="quantityControls">
                  <button onClick={() => decreaseQuantity(item.productId)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.productId)}>
                    <FaPlus />
                  </button>
                </div>
                <button
                  className="removeButton"
                  onClick={() => removeFromCart(item.productId)}
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
          <div className="cartSummary">
            <p>Subtotal: ₹ {total}</p>
            <p>Delivery Charge: ₹ {deliveryCharge}</p>
            <p>Shipping Charge: ₹ {shippingCharge}</p>
            <p>Tax: ₹ {tax}</p>
            <h2>Total: ₹ {total + deliveryCharge + shippingCharge + tax}</h2>
            <button className="placeOrderButton" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
