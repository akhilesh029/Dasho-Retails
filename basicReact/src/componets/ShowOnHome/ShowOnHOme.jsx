import React, { useState, useEffect } from "react";
import axios from "axios";
import './ShowOnHome.css';

import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

const ShowOnHOme = () => {
  const [res, setRes] = useState([]);
  const [para, setPara] = useState(false)
  const navigate = useNavigate();

  // const location = useLocation();
  // const para = location.state;
  // console.log(para);

  //------------------------addtoCart----------------------
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [name, setName] = useState('Akhil')

  

  const handleAddItem = (item) => {
    const cartAdded = document.getElementById('cartAdded')
    // console.log(item)
    setSelectedItems([...selectedItems, item]);
    setCartTotal(cartTotal + item.itemPrice);
    // cartAdded.innerHTML = "Add"
    // console.log(item.itemPrice)
   

  };

  const handleRemoveItem = (item) => {
    let count = 0;
    const updatedItems = selectedItems.filter((selected) =>{
      if(selected._id !== item._id){
        
          return true
      }
      else{
        count++;
       return false
      }
      
    } 
    );
    console.log(count)
    setSelectedItems(updatedItems);
    setCartTotal(cartTotal - item.itemPrice*count);
  };

  const delcharge = 50
  const shipcharge = 20
  const tax = 10
  const totalpay = cartTotal+delcharge+shipcharge+tax


  const handleCheckout = (e) => {
     e.preventDefault()

     const orderplaced = document.getElementById("orderPlaced")
     

    // Make a POST request to your backend API to submit the order
    axios
    .post("http://localhost:3000/orders", {selectedItems, totalpay, name})
    .then(()=>{
      console.log(selectedItems)
      console.log(cartTotal)
      console.log(name)
      console.log("Order Placed Successfully")
      orderplaced.innerHTML = "Order Placed!"
      orderplaced.style.color = "blue"
      setTimeout(() => {
        navigate("/pay", { replace: true, state: {  } });
        
      }, 2000);
      
        
      

    }
  )
  
    .catch(error => {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    });
  };

  const viewMoreButtons = document.querySelectorAll(".view-more-button");
  viewMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const description = button.parentElement.querySelector(".showonHomeMain");
      description.style.height = "auto";
      button.style.display = "none";
    });
  });

  const handleviewCartItems=()=>{
    if(para === false){
      setPara(true)
    }
    else{
      setPara(false)
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3000/showproduct")
      .then((res) => {
        setItems(res.data);
        setRes(res.data);
        console.log("ShowOnHOme:",res.data)        
      })
      .catch((err) => console.log(err));
  }, []);

  function buyNow(id) {
    // console.log(id);
    navigate("/buyitems", { replace: true, state: { id } });
  }

  return (
    <>
   
<Header />
<div className="showonHomeMain">
  {res.length > 0 ? (
    res
      .filter((item) => item.isActive) // Filter items where isActive is true
      .map((item) => {
        return (
          <div className="showonHome" key={item._id}>
            {item.itemImage && (
              <img
                className="homephoto"
                src={`http://localhost:3000/` + item.itemImage}
                alt={item.itemName || "Item image"}
              />
            )}
            <h1>{item.itemName}</h1>
            <p>{item.itemDescription || "No description available"}</p>
            {item.itemPrice > 0 ? (
              <p className="price">₹ {item.itemPrice}</p>
            ) : (
              <p className="price">Price not available</p>
            )}
            <div id="cartBuybtn">
              <button onClick={() => buyNow(item._id)}>Buy Now</button>
              <button id="cartAdded" onClick={() => handleAddItem(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        );
      })
  ) : (
    <p>No items to display</p>
  )}
</div>




      <button class="view-more-button">View More</button>
      <button class="view-cart-items" onClick={handleviewCartItems} >View Cart Items</button>
      {para &&
      <div>

     <div className="mainCartItemList">

      <ul>
      <h2>Cart</h2>
        {selectedItems.map((item) => (
          <li key={item._id} className="cartItemList">
             <img
                  className="homephoto"
                  src={`http://localhost:3000/` + item.itemImage}
                  alt=""
                />
                <p>{item.itemName}</p>
                <p>₹ {item.itemPrice}</p>
              
            <button className="remove" onClick={() => handleRemoveItem(item)}> Remove</button>
          </li>
        ))}
      </ul>

      <div className="checkoutPannel">
      <p>Subtotal: ₹ {cartTotal}</p>
      <p>Delivery Charge: ₹ {delcharge}</p>
      <p>Shipping charge: ₹ {shipcharge}</p>
      <p>Tax: ₹ {tax}</p>
      <hr />
      {(cartTotal>0)?<h2>Total : {cartTotal+delcharge+shipcharge+tax}</h2>:<h2>Total : {0}</h2>}
      
      <button onClick={handleCheckout} disabled={selectedItems.length === 0}>
        Checkout
      </button>
      <p id="orderPlaced"></p>
      </div>

     </div>

     
   </div>
}
    </>
  );
};

export default ShowOnHOme;
