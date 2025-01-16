import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./BuyItems.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const BuyItems = () => {
  const [product, setProduct] = useState(null);
  const { cartTotal, setCartTotal, selectedItems, setSelectedItems } = useContext(AppContext);

  const location = useLocation();
  const productId = location.state?.id;

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get("http://localhost:3000/showproduct");
      const productData = response.data.find((item) => item._id === id);
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const updatedItems = [...selectedItems];
      const existingItemIndex = updatedItems.findIndex(item => item._id === product._id);

      if (existingItemIndex > -1) {
        // If item already exists in cart, increase quantity
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        // Otherwise, add the product with quantity 1
        updatedItems.push({ ...product, quantity: 1 });
      }

      setSelectedItems(updatedItems);
      updateCartTotal(updatedItems);
    }
  };

  const handleQuantityChange = (id, action) => {
    const updatedItems = selectedItems.map(item => {
      if (item._id === id) {
        if (action === 'increase') {
          item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });
    
    setSelectedItems(updatedItems);
    updateCartTotal(updatedItems);
  };

  const updateCartTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);
    setCartTotal(total);
  };

  const handleCheckout = () => {
    console.log("Checkout initiated for:", selectedItems);
    // Perform checkout logic here
    setSelectedItems([]);
    setCartTotal(0);
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="buy-items-container">
      <div className="product-details">
        <div className="product-image">
          <img
            src={`http://localhost:3000/${product.itemImage}`}
            alt={product.itemName}
          />
        </div>
        <div className="product-info">
          <h1>{product.itemName}</h1>
          <h4>Description</h4>
          <p>{product.itemDescription}</p>
          <h4>Price</h4>
          <p className="price">₹ {product.itemPrice}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="cart-section">
        <h2>Shopping Cart</h2>
        {selectedItems.length > 0 ? (
          <>
            <ul className="cart-items">
              {selectedItems.map((item) => (
                <li key={item._id} className="cart-item">
                  <div className="cart-item-info">
                    <img
                      src={`http://localhost:3000/${item.itemImage}`}
                      alt={item.itemName}
                      className="cart-item-image"
                    />
                    <span>{item.itemName} - ₹{item.itemPrice}</span>
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item._id, 'decrease')}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item._id, 'increase')}
                      >
                        +
                      </button>
                    </div>
                    <span>₹{item.itemPrice * item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">Total: ₹{cartTotal}</div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default BuyItems;
