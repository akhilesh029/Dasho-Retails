import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerPage.css";
import { useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';


function SellerPage({ userEmail }) {
  //-------------getting data from login page-----
  const location = useLocation();
  console.log("console location data: ",location)
  // const m = location.state.userEmail;
  const m = location.state;
  
  // console.log(m);
  console.log("akil")
  console.log(m.userEmail);
  console.log(m);


  //





  //-----------------------------------------
  const [showContent, setShowContent] = useState(true);
  const [showShipping, setShowShipping] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isOrder, setisOrder] = useState(false);
  const [isShipped, setShipped] = useState(false)
  const [ordersArray, setOrdersArray] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [file, setFile] = useState();
  const [sellerEmail, setSellerEmail] = useState(m.userEmail);

  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [Description, setDescription] = useState();

  const [res, setRes] = useState([]);
  const [users, setUsers] = useState([]);


  const [selectedItem, setSelectedItem] = useState("Dashboard");

  
  


  const handleClick = (itemName) => {
    setSelectedItem(itemName),
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

  const SeeShippedOrders = ()=>{
    setShipped(true)
    setisOrder(false)
    setShowShipping(false);
    setShowContent(false);
  }

  

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
    formData.append("sellerEmail", sellerEmail);

 

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
      <div className="adminPage">
        <div className="sidepanel">
           <ul className="adminSetting">
        <li><h1>Welcome to Desho</h1></li>
        <li className={`sidepanellist ${selectedItem === "Dashboard" ? 'selected' : ''}`} onClick={() => handleClick("Dashboard")}>Dashboard</li>
        <li className={`sidepanellist ${selectedItem === "Upload" ? 'selected' : ''}`} onClick={() => handleClick("Upload")}>Upload Item</li>
        <li className={`sidepanellist ${selectedItem === "Products" ? 'selected' : ''}`} onClick={() => handleClick("Products")}>Products</li>
        <li className={`sidepanellist ${selectedItem === "Shipping" ? 'selected' : ''}`} onClick={handleShipping}>Shipping</li>
        <li className={`sidepanellist ${selectedItem === "Orders" ? 'selected' : ''}`} onClick={handleOrders}>Orders</li>
        <li className={`sidepanellist ${selectedItem === "Shipped Orders" ? 'selected' : ''}`} onClick={SeeShippedOrders}>Shipped Orders</li>
        <li className="sidepanellist">Completed Order</li>
        <li className="sidepanellist">Support</li>
        <li className="sidepanellist">Customer Feedback</li>
        <li className="sidepanellist">Revenue</li>
        <li className="visit-shop-list-item" style={{ cursor: 'pointer' }}>
        <Link to="/shop" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
           <IoMdSettings /> Visit Your Shop
      </Link>
    </li>
      </ul>
        </div>


{/* =============================================   DashBoard ========================================================= */}
{ selectedItem === "Dashboard"  && (
     <div className="dashboard">
     <div className="section" id="sales-performance">
       <div className="section-heading"><h2>Sales Performance</h2> </div>
       <p><b>Total Sales: </b> $20,000</p>
       <p><b>Number of Orders:</b> 150</p>
       <p><b>Average Order Value (AOV): </b> $133.33</p>
       <p><b>Sales Trends: <span>[Graph Placeholder]</span></b></p>
     </div>

     <div className="section" id="product-performance">
     <div className="section-heading"><h2>Product Performance</h2> </div>
       <p><b>Top Selling Products:</b> Product A, Product B, Product C</p>
       <p><b> Product Views:</b> Product A - 200, Product B - 150, Product C - 100</p>
     </div>

     <div className="section" id="customer-insights">
     <div className="section-heading"><h2>Customer Insights</h2> </div>
       <p><b>Customer Demographics: </b> 60% Female, 40% Male</p>
       <p><b>Repeat Customer Rate: </b> 25%</p>
       <p><b>Customer Feedback Ratings: </b> 4.5/5</p>
     </div>

     <div className="section" id="financial-metrics">
     <div className="section-heading"> <h2>Financial Metrics</h2></div>
       <p><b>Revenue: </b> $20,000</p>
       <p><b>Expenses: </b> $5,000</p>
       <p><b>Payouts: </b>$15,000 (Completed)</p>
     </div>

     <div className="section" id="marketing-analytics">
     <div className="section-heading"><h2>Marketing Analytics</h2></div>
       
       <p><b>Traffic Sources: </b>50% Direct, 30% Referral, 20% Ads</p>
       <p><b>Conversion Rate: </b> 5%</p>
     </div>

     <div className="section" id="operational-metrics">
     <div className="section-heading"><h2>Operational Metrics</h2></div>
       <p><b>Order Fulfillment Rate: </b> 95%</p>
       <p><b>Shipping Performance:</b> Average shipping time - 2 days</p>
       <p><b>Support Tickets:</b> 20 open tickets</p>
     </div>

     <div className="section" id="promotional-performance">
     <div className="section-heading">     <h2>Promotional Performance</h2>
     </div>
       <p><b>Promotion Results:</b> 30% increase in sales during the last campaign</p>
       <p><b>Coupon Usage:</b> 25% of customers used coupons</p>
     </div>
   </div>
)}
        
{/* ================================================ Add Item ========================================================= */}
{selectedItem === "Upload" && (
          <div className="sellerdiv">
            <form className="seller-form" onSubmit={handleSubmit}>
            <h2>Upload your Product</h2>
              <div className="form-fields">
                <label htmlFor="itemName">Product Name:</label>
                <input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={handleItemNameChange}
                  required
                />
              </div>
              <div className="form-fields">
                <label htmlFor="itemPrice">Price:</label>
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
                Upload Item
              </button>
            </form>
            <br />



          </div>
        )}

{/* ================================================= Products Available ==================================================== */}
{selectedItem === "Products" && (
      <div className="showItems" >
        <h1>Available Products</h1>
        <table className="responsive-table">
          <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
         </thead>
         <tbody>
        {res.map((item) => {
            if (item.sellerEmail === m.userEmail) {
                return (
                    <tr key={item._id}>
                        <td>
                            <img
                                className="photo"
                                src={`http://localhost:3000/Images/` + item.image}
                                alt="item"
                            />
                        </td>
                        <td>{item.itemName}</td>
                        <td>{item.itemPrice}</td>
                        <td>{item.itemDescription}</td>
                        <td>
                            <button style={{ color: "red" }} onClick={() => deleteData(item._id)}>Delete</button>
                        </td>
                    </tr>
                );
            }
            return null; // Return null if the condition is not met
        })}
    </tbody>
</table>


     
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
