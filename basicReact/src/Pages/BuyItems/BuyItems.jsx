import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./BuyItems.css";
import ShowOnHOme from "../../componets/ShowOnHome/ShowOnHome";
// import "./ShowOnHOme.css";

const BuyItems = (props) => {
  const [res, setRes] = useState([]);

  const location = useLocation();
  const id = location.state;
  console.log(id);

  //------------cartItems-----------------------

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
  //   // Fetch item data from your backend or API
  //   fetchItemsData();
  // }, []);

  // const fetchItemsData = async () => {
  //   try {
  //     const response = await fetch('https://your-api-endpoint/items');
  //     const data = await response.json();
  //     setItems(data);
  //   } catch (error) {
  //     console.error('Error fetching item data:', error);
  //   }
  // };

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    setCartTotal(cartTotal + item.price);
  };

  const handleRemoveItem = (item) => {
    const updatedItems = selectedItems.filter(
      (selected) => selected.id !== item.id
    );
    setSelectedItems(updatedItems);
    setCartTotal(cartTotal - item.price);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here, e.g., sending order data to your backend
    console.log("Checkout:", selectedItems);
    setSelectedItems([]);
    setCartTotal(0);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/getImage")

      .then((res) => {
        setItems(res.data);
        setRes(res.data);
        console.log(res.data._id);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <div className="maindivofbuy">

   
      {/* <div>BuyItems</div> */}
      <div className="buyMaindiv">
        {res.map((item) => {
          if (item._id == id.id) {
            return (
              <>
                <div className="bleftdiv">
                  <img
                    id="bimg"
                    src={`http://localhost:3000/Images/` + item.image}
                    alt=""
                  />
                </div>
                <div className="brightdiv">
                  <h1 key={item._id}>{item.itemName}</h1>
                  <h4>Description</h4>
                  <p className="bdescription" key={item._id}>
                    {item.itemDescription}
                  </p>
                  <h4>Price: </h4>
                  <p className="buyPrice" key={item._id}>
                    {" "}
                    ₹ {item.itemPrice}
                  </p>
                  <button className="buybtn">Buy Now</button>
       
                </div>
              </>
            );
          }
        })}
      </div>

      <ShowOnHOme />
      </div>
    </>
  );
};

export default BuyItems;
