import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import "./CartPage.css"
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const {selectedItems,setSelectedItems,updateCartTotal,cartTotal} = useContext(AppContext);

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

   const navigate = useNavigate();
    const BuycartItem=()=>{
      navigate('/order');
    }

  return (
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
        <button className="checkout-btn" onClick={BuycartItem}>
          Buy Now
        </button>
      </>
    ) : (
      <p>Your cart is empty.</p>
    )}
  </div>
  )
}

export default CartPage