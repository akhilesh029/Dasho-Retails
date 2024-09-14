import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowOnHOme.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const ShowOnHOme = () => {
  const [res, setRes] = useState([]);
  const navigate = useNavigate();

  //------------------------addtoCart----------------------
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const handleAddItem = (item) => {
    console.log(item)
    setSelectedItems([...selectedItems, item]);
    setCartTotal(cartTotal + item.itemPrice);
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

  const handleCheckout = () => {
    // Implement your checkout logic here, e.g., sending order data to your backend
    console.log("Checkout:", selectedItems);
    setSelectedItems([]);
    setCartTotal(0);
  };

  const viewMoreButtons = document.querySelectorAll(".view-more-button");
  viewMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const description = button.parentElement.querySelector(".showonHomeMain");
      description.style.height = "auto";
      button.style.display = "none";
    });
  });

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
                  <button onClick={() => handleAddItem(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <button class="view-more-button">View More</button>
      <h2>Cart</h2>
      <ul>
        {selectedItems.map((item) => (
          <li key={item._id}>
             <img
                  className="homephoto"
                  src={`http://localhost:3000/Images/` + item.image}
                  alt=""
                />
            {item.itemName} - ₹ {item.itemPrice}
            <button onClick={() => handleRemoveItem(item)}>Remove</button>
          </li>
        ))}
      </ul>

      <p>Total: ₹ {cartTotal}</p>
      <button onClick={handleCheckout} disabled={selectedItems.length === 0}>
        Checkout
      </button>
    </>
  );
};

export default ShowOnHOme;
