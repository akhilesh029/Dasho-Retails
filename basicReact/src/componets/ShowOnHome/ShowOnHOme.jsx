import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowOnHOme.css";
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
        navigate("/paymethod", { replace: true, state: {  } });
        
      }, 2000);
      
        
      

    }
  )
    // .then(data => {
    //   // Handle the response from the backend
    //   if (data.success) {
    //     // Order was placed successfully, show a success message or redirect to a confirmation page
    //     console.log('Order placed successfully:', data);
    //     // Clear the cart
    //     setSelectedItems([]);
    //     setCartTotal(0);
    //   } else {
    //     // Handle errors or show an error message
    //     console.error('Error placing order:', data.error);
    //   }
    // })
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
    axios
      .get("http://localhost:3000/getImage")

      .then((res) => {
        setItems(res.data);
        setRes(res.data);
        // console.log(res.data._id);
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
        {res.map((item) => {
          return (
            <>
              <div className="showonHome">
                <img
                  className="homephoto"
                  src={`http://localhost:3000/Images/` + item.image}
                  alt=""
                />
                <h1 key={item._id}>{item.itemName}</h1>
                <p key={item._id}>{item.itemDescription}</p>
                <p className="price" key={item._id}>
                  ₹ {item.itemPrice}
                </p>
                <div id="cartBuybtn">
                  <button key={item._id} onClick={() => buyNow(item._id)}>
                    Buy
                  </button>
                  <button id="cartAdded" onClick={() => handleAddItem(item)}>
                     Cart
                  </button>
                </div>
              </div>
            </>
          );
        })}
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
                  src={`http://localhost:3000/Images/` + item.image}
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
