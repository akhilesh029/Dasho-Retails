import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerPage.css";
import { useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import Header from "../../componets/Header/Header";


// import { resolve } from 'path/posix';

// import 'path-browserify';
// const path = require('path');

// Now you can use path.posix.resolve
// const resolvedPath = path.posix.resolve('/some/path', './relative/path');

function SellerPage({ userEmail }) {
  //-------------getting data from login page-----
  const location = useLocation();
  // console.log(location.state.email)
  const m = location.state.userEmail;
  // console.log(userEmail)
  // console.log(m);
  // console.log(m.email);
  //-----------------------------------------
  const [showContent, setShowContent] = useState(true);
  const [showShipping, setShowShipping] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isOrder, setisOrder] = useState(false);
  const [isShipped, setShipped] = useState(false)

  const [ordersArray, setOrdersArray] = useState([]);
  const [orderData, setOrderData] = useState([]);
  


  const handleClick = () => {
    setShowContent(!showContent);
    setShowShipping(false);
    setisOrder(false);
    setShipped(false)
  };
  const handleShipping = () => {
    setShowShipping(!showShipping);
    setShowContent(false);
    setisOrder(false);
    setShipped(false)
  };

  
  
  const handleOrders = () => {
    // ordersArray = [null];

    axios
      .get("http://localhost:3000/order")
      .then((orders) => {
        setisOrder(true);
        setShowShipping(false);
        setShowContent(false);
        setShipped(false)
        // setOrders(orders.data)
        // console.log(orders)
        setOrderData(orders.data);
       

        for (const order of orders.data) {
          for (const item of order.selectedItems) {
            setOrdersArray(item.itemPrice);
            setOrdersArray(item.itemName);

          }
        }
      
      })

      .catch((err) => console.log(err));
  };

  const SeeShippedOrders = ()=>{
    setShipped(true)
    setisOrder(false)
    setShowShipping(false);
    setShowContent(false);
  }

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [file, setFile] = useState();

  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [Description, setDescription] = useState();

  const [res, setRes] = useState([]);
  const [users, setUsers] = useState([]);

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleItemDescriptionChange = (event) => {
    setItemDescription(event.target.value);
  };

  const handleItemPriceChange = (event) => {
    setItemPrice(event.target.value);
  };

  const handleItemImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  // request to userdata from database
  useEffect(() => {
    axios
      .get("http://localhost:3000/user")
      .then((users) => setUsers(users.data))
      //  console.log(users)
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const additem = document.getElementById("sellerbtn")
   
    additem.innerHTML = 'Item added Successfully!'
    additem.style.color = '#37FD12'

    // Create a FormData object to send the image and other data
    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("itemDescription", itemDescription);
    formData.append("itemPrice", itemPrice);
    formData.append("file", file);

 

    // Send the form data to your server-side API
    axios
      .post("http://localhost:3000/sellerpage", formData)
      .then
      // (result) => console.log(result)
      // Handle successful submission
      // console.log('Item added successfully!');
      ()
      .catch(error);
    console.error("Error:", error);
  };
  
  

  useEffect(() => {
    axios
      .get("http://localhost:3000/getImage")

      .then((res) => {
        // console.log(res);
        setImage(res.data[0].image);
        setName(res.data[0].itemName);
        setPrice(res.data[0].itemPrice);
        setDescription(res.data[0].itemDescription);

        setRes(res.data);

      })
      .catch((err) => console.log(err));
  }, []);


  // console.log(ordersArray);
  // console.log(orderData)

// deleting the items from database by seller
  const deleteData = async (id) => {
    // console.log(id)
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`, { params: { id } });
      // fetchData(); // Update the data after deletion
        console.log("data deleted susccessfully")
        window.location.reload()

    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };



function handleShipOrder(orderData, orderId) {
  console.log(orderData);
  console.log(orderId);
  console.log(orderData.length);
  for (let i = 0; i < orderData.length; i++) {
    console.log(orderData[i]);
    console.log(orderData[i]._id);
    if (orderData[i]._id === orderId) {
      console.log("yes");
    }
  }
}

 

  return (
    <>
      <Header />

      <div className="adminPage">
        <div className="sidepanel">
          <ul className="adminSetting">
            {users.map((item) => {
              if (item.email == m.email)
                return (
                  <>
                    <h1 key={item._id}>Welcome @{item.name}</h1>
                  </>
                );
            })}
            <li className="sidepanellist" onClick={handleClick}>
              Dashboard
            </li>
            <li className="sidepanellist" onClick={handleShipping}>
              Shipping
            </li>
            <li className="sidepanellist" onClick={handleOrders}>
            
              Orders
            </li>
            <li className="sidepanellist"  onClick={SeeShippedOrders}>Shipped Orders</li>
            <li className="sidepanellist">Completed Order</li>
            <li className="sidepanellist">Support</li>
            <li className="sidepanellist">Customer Feedback</li>
            <li className="sidepanellist">Revenue</li>
          </ul>
        </div>

        {showContent && (
          <div className="sellerdiv">
            <h2>Add Item</h2>

            <form className="seller-form" onSubmit={handleSubmit}>
              <div className="form-fields">
                <label htmlFor="itemName">Item Name:</label>
                <input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={handleItemNameChange}
                  required
                />
              </div>
              <div className="form-fields">
                <label htmlFor="itemPrice">Item Price:</label>
                <input
                  type="number"
                  id="itemPrice"
                  value={itemPrice}
                  onChange={handleItemPriceChange}
                  required
                />
              </div>

              <div className="form-fields">
                <label htmlFor="itemDescription">Item Description:</label>
                <textarea
                  id="itemDescription"
                  value={itemDescription}
                  onChange={handleItemDescriptionChange}
                  required
                />
              </div>

              <div className="form-fields imageInput">
                <label htmlFor="file">Item Image:</label>
                <input
                  type="file"
                  id="file"
                  // accept="image/*"
                  accept="image"
                  onChange={handleItemImageChange}
                  required
                />
              </div>
              <button  className="sellerbtn" type="submit">
                Add Item
              </button>
              <p id="sellerbtn"></p>
            </form>
            <br />

            <div className="showItems" >
              <table>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </table>

              {res.map((item) => {
                return (
                  <>
                    <table >
                      <tr >
                        <td key={item._id}>
                          {
                            <img
                              className="photo"
                              src={`http://localhost:3000/Images/` + item.image}
                              alt="item image"
                            />
                          }
                        </td>
                        <td key={item._id}>{item.itemName}</td>
                        <td key={item._id}>{item.itemPrice}</td>
                        <td key={item._id}>{item.itemDescription}</td>
                        <td key={item._id}>
                          <button style={{ color: "red" }} onClick={() => deleteData(item._id)}>Delete</button>
                        </td>
                      </tr>
                    </table>
                  </>
                );
              })}
            </div>
          </div>
        )}

        {showShipping && (
          <div className="bottomPage">
            <h1>This is Shipping Section</h1>
          </div>
        )}

{/* --------------------orders-------------------- */}
        {isOrder && (
          
          <div className="mainorderdata">
           
            <div className="orderdataCustomer">
              <h2>Order Details</h2>
              <p>Order ID: {orderData[0]._id}</p>
              <p>Name: {orderData[0].name}</p>
              <p>Total: {orderData[0].totalpay}</p>
            </div>

            <ul className="orderdataUldiv">
              <h3>Ordered Items:</h3>

              <div>
                {orderData.map((order, orderIndex) => (
                  <ul key={orderIndex}>
                    <div className="shippingBtn">
                     

                    <h4>Order {orderIndex + 1}</h4>
                    <button type="button" id="shippingBtn" data-order-id={order._id} onClick={()=>handleShipOrder(orderData,order._id)}>Ship</button>
                  
                    </div>
                    {order.selectedItems.map((item, itemIndex) => (
                      <li key={`${orderIndex}-${itemIndex}`}>
                        <div className="orderdatalist">
                          {/* <h4>Item {itemIndex + 1}</h4> */}
                          <img
                            className="orderdataimg"
                            src={`http://localhost:3000/Images/` + item.image}
                            alt={item.itemName}
                          />
                          <p> {item.itemName}</p>
                          <p>Rs. {item.itemPrice}</p>
                          <p> {item.itemDescription}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </ul>
          </div>
        )}




        {isShipped  && (
          // <h1>Shipped</h1>
          <div className="mainorderdata">
           
            {/* <div className="orderdataCustomer">
              <h2>Order Details</h2>
              <p>Order ID: {orderData[0]._id}</p>
              <p>Name: {orderData[0].name}</p>
              <p>Total: {orderData[0].totalpay}</p>
            </div> */}

            <ul className="orderdataUldiv">
              <h3>Shipped Items:</h3>

              <div>
                {orderData.map((order, orderIndex) => (
                  <ul key={orderIndex}>
                    <div className="shippingBtn">
                     
                    {/* <button type="button" id="shippingBtn" data-order-id={order._id} onClick={()=>handleShipOrder(orderData,order._id)}>Ship</button> */}

                    <h4>Order {orderIndex + 1}</h4>
                  
                    </div>
                    {order.selectedItems.map((item, itemIndex) => (
                      <li key={`${orderIndex}-${itemIndex}`}>
                        <div className="orderdatalist">
                          {/* <h4>Item {itemIndex + 1}</h4> */}
                          <img
                            className="orderdataimg"
                            src={`http://localhost:3000/Images/` + item.image}
                            alt={item.itemName}
                          />
                          <p> {item.itemName}</p>
                          <p>Rs. {item.itemPrice}</p>
                          <p> {item.itemDescription}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </ul>
          </div>
        )}






      </div>
    </>
  );
}

export default SellerPage;
