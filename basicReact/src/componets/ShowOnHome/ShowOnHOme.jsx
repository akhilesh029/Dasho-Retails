import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowOnHome.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";

const ShowOnHome = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [isCartVisible, setIsCartVisible] = useState(false);
  const navigate = useNavigate();

  // Mock customer details (Replace this with actual authentication logic)
  const customerId = "12345"; // Example customer ID
  const customerEmail = "customer@example.com"; // Example customer email

  const deliveryCharge = 50;
  const shippingCharge = 20;
  const tax = 10;

  // Fetch products on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/showproduct")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add to Cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.productId === product.productId);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove from Cart
  const removeFromCart = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item.productId === productId
          ? null
          : item
      )
      .filter(Boolean);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate Total
  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.itemPrice * item.quantity,
      0
    );
    return subtotal + deliveryCharge + shippingCharge + tax;
  };

  // Handle Checkout
  const handleCheckout = () => {
    const orderDetails = {
      customerId,
      customerEmail,
      cart,
      total: calculateTotal(),
    };

    axios
      .post("http://localhost:3000/orders", orderDetails)
      .then(() => {
        alert("Order placed successfully!");
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/order-success");
      })
      .catch((err) => console.error("Error placing order:", err));
  };

  // Toggle Cart Visibility
  const toggleCartVisibility = () => setIsCartVisible(!isCartVisible);

  return (
    <>
      <Header />
      <div className="showonHomeMain">
      {products.length > 0 ? (
        products
          .filter((item) => item.isActive)
          .map((item) => (
            <div className="showonHome" key={item.productId}>
              <div className="image-container">
                <img
                  className="homephoto"
                  src={`http://localhost:3000/${item.itemImage}`}
                  alt={item.itemName || "Item image"}
                />
              </div>
              <h2>{item.itemName}</h2>
              <p>{item.itemDescription || "No description available"}</p>
              <p className="price">₹ {item.itemPrice}</p>
              <div className="cartBuybtn">
                <button onClick={() => addToCart(item)}>
                  <FaShoppingCart /> Add to Cart
                </button>
                <button
                  onClick={() => navigate("/buyitems", { state: { id: item.productId } })}
                >
                  <FaMoneyBillWave /> Buy Now
                </button>
              </div>
            </div>
          ))
      ) : (
        <p>No items to display</p>
      )}
    </div>

      {/* <button className="view-cart-items" onClick={toggleCartVisibility}>
        {isCartVisible ? "Hide Cart" : "View Cart"}
      </button> */}
      

      {isCartVisible && (
        <div className="cartSection">
          <h2>Cart</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <li key={item.productId} className="cartItem">
                  <img
                    className="cartImage"
                    src={`http://localhost:3000/${item.itemImage}`}
                    alt={item.itemName}
                  />
                  <p>{item.itemName}</p>
                  <p>₹ {item.itemPrice}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty</p>
          )}
          <div className="checkoutPanel">
            <p>Delivery Charge: ₹ {deliveryCharge}</p>
            <p>Shipping Charge: ₹ {shippingCharge}</p>
            <p>Tax: ₹ {tax}</p>
            <h2>Total: ₹ {calculateTotal()}</h2>
            <button onClick={handleCheckout} disabled={cart.length === 0}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowOnHome;
