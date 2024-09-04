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

function SellerPage({userEmail}) {
  //-------------getting data from login page-----
  const location = useLocation();
  // console.log(location.state.email)
  const m = location.state.userEmail
  // console.log(userEmail)
  console.log(m);
  // console.log(m.email);
  //-----------------------------------------
  const [showContent, setShowContent] = useState(true);
  const [showShipping, setShowShipping] = useState(false);
  

  const handleClick = () => {
    setShowContent(!showContent);
    setShowShipping(false)
  };
  const handleShipping = () => {
    setShowShipping(!showShipping);
    setShowContent(false);
  };

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

  // console.log(res);
  const reverseArray = res.reverse();

  return (
    <>
      <Header />
    
      

      <div className="adminPage">
       
        <div className="sidepanel">
        
          <ul className="adminSetting">
            
          {users.map((item)=>{
           if(item.email == m.email)
            return(
          <>
                
                 <h1 key={item._id}>Welcome @{item.name}</h1>
          </>
            )
         
        })}
            <li className="sidepanellist" onClick={handleClick}>
              Dashboard 
            </li>
            <li className="sidepanellist" onClick={handleShipping}>
              Shipping
            </li>
            <li className="sidepanellist">Pending Orders</li>
            <li className="sidepanellist">Shipped Orders</li>
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
              <button className="sellerbtn" type="submit">
                Add Item
              </button>
            </form>
            <br />

            <div className="showItems">
              <table>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </table>

              {reverseArray.map((item) => {
                return (
                  <>
                    <table>
                      <tr>
                        <td key={item._id}>
                          {
                            <img
                              className="photo"
                              src={`http://localhost:3000/Images/` + item.image}
                              alt=""
                            />
                          }
                        </td>
                        <td key={item._id}>{item.itemName}</td>
                        <td key={item._id}>{item.itemPrice}</td>
                        <td key={item._id}>{item.itemDescription}</td>
                        <td key={item._id}>
                          <button style={{ color: "red" }}>REMOVE</button>
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

      
      </div>
    </>
  );
}

export default SellerPage;
