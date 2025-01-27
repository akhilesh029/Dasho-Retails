import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerPage.css";
import { useLocation } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  FaBoxes,
  FaChartBar,
  FaFileUpload,
  FaListAlt,
  FaTruck,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserCog,
  FaCommentAlt,
  FaHome,
} from "react-icons/fa";
import { FaCheck, FaTimes } from "react-icons/fa";

function SellerPage() {
  //-------------gettind data from state that is set in firebase page-----

  const location = useLocation(); // useLocation hook is used to get the data from the state
  const { sellerId, userEmail } = location.state;
  console.log("sellerId: ", sellerId, "userEmail: ", userEmail);

  //-----------------------------------------
  const [showContent, setShowContent] = useState(true);
  const [showShipping, setShowShipping] = useState(false);
  // const [orders, setOrders] = useState([]);
  const [isOrder, setisOrder] = useState(false);
  const [isShipped, setShipped] = useState(false);
  const [ordersArray, setOrdersArray] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [file, setFile] = useState(null);
  const [sellerEmail, setSellerEmail] = useState(userEmail);
  const [id, setId] = useState(sellerId);
  const [timeLimit, setTimeLimit] = useState(""); // State for time limit
  const [timeUnit, setTimeUnit] = useState(""); // State for time unit (hours or days)
  const [productCount, setProductCount] = useState(""); // State for product count

  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [Description, setDescription] = useState();

  const [res, setRes] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const handleClick = (itemName) => {
    setSelectedItem(itemName), setShowContent(!showContent);
    setShowShipping(false);
    setisOrder(false);
    setShipped(false);
  };

  // -------------------------------------------------------
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

  // Handler for time limit
  const handleTimeLimitChange = (event) => {
    setTimeLimit(event.target.value);
  };

  // Handler for time unit (hours or days)
  const handleTimeUnitChange = (event) => {
    setTimeUnit(event.target.value);
  };

  // New handler for product count
  const handleProductCountChange = (event) => {
    setProductCount(event.target.value);
  };

  // ===========================================================

  const SeeShippedOrders = () => {
    setShipped(true);
    setisOrder(false);
    setShowShipping(false);
    setShowContent(false);
  };

  //-------------------------------------------------

  // Handle form submission
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (
      !id ||
      !itemName ||
      !itemDescription ||
      !itemPrice ||
      !file ||
      !sellerEmail ||
      !timeLimit ||
      !timeUnit ||
      !productCount
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const additem = document.getElementById("sellerbtn");
    additem.innerHTML = "Adding item...";
    additem.style.color = "orange";
    additem.disabled = true;

    // Create FormData
    const formData = new FormData();
    formData.append("id", id);
    formData.append("itemName", itemName);
    formData.append("itemDescription", itemDescription);
    formData.append("itemPrice", itemPrice);
    formData.append("file", file);
    formData.append("sellerEmail", sellerEmail);
    formData.append("timeLimit", timeLimit); // Add time limit
    formData.append("timeUnit", timeUnit); // Add time unit (hours or days)
    formData.append("productCount", productCount); // Add product count

    // Send data to server
    axios
      .post("http://localhost:3000/uploadProduct", formData)
      .then((response) => {
        console.log("Response:", response.data);
        alert("Item(s) added successfully!");
        additem.innerHTML = "Item(s) added Successfully!";
        additem.style.color = "blue";
        additem.disabled = false;

        // Optionally clear the form
        setItemName("");
        setItemDescription("");
        setItemPrice("");
        setFile(null);
        setSellerEmail("");
        setTimeLimit(""); // Clear time limit
        setTimeUnit(""); // Clear time unit
        setProductCount(""); // Clear product count
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        alert("Failed to add the item(s). Please try again.");
        additem.innerHTML = "Add Item";
        additem.style.color = "red";
        additem.disabled = false;
      });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/showproduct")
      .then((res) => {
        setRes(res.data);
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // ========================Orders-Logic========================================

  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const sellerToken = localStorage.getItem("authToken");
      console.log(sellerToken);

      if (!sellerToken) {
        alert("Please log in as a seller.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/orders/seller",
          {
            headers: {
              Authorization: `Bearer ${sellerToken}`,
            },
          }
        );

        setOrders(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, itemId, status) => {
    const sellerToken = localStorage.getItem("sellerToken");
    console.log("Updating status for orderId:", orderId, "itemId:", itemId);

    if (!sellerToken) {
      alert("Please log in as a seller.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/orders/${orderId}/items/${itemId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                items: order.items.map((item) =>
                  item._id === itemId
                    ? { ...item, status: response.data.status }
                    : item
                ),
              }
            : order
        )
      );

      alert("Item status updated successfully!");
    } catch (error) {
      console.error("Error updating item status:", error);
      alert("Failed to update item status. Please try again.");
    }
  };

  // deleting the items from database by seller
  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`, {
        params: { id },
      });
      // fetchData(); // Update the data after deletion
      console.log("data deleted susccessfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting data:", error);
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

  // ==============================Inactive_products=================================

  const [inactiveProducts, setInactiveProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reactivateProduct, setReactivateProduct] = useState({
    productId: "",
    timeLimit: "",
    timeUnit: "hours",
  });

  const showInactiveProducts = () => {
    // Fetch inactive products for the seller
    const fetchInactiveProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/inactiveProducts/${userEmail}`
        );
        setInactiveProducts(response.data.inactiveProducts);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching products.");
        setLoading(false);
      }
    };

    fetchInactiveProducts();
  };
  // ===============================Reactivating Products==================================
  const handleReactivate = async (e) => {
    e.preventDefault();

    if (
      !reactivateProduct.productId ||
      !reactivateProduct.timeLimit ||
      !reactivateProduct.timeUnit
    ) {
      alert("Please fill in all fields to reactivate the product.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/reactivateProduct/${reactivateProduct.productId}`,
        {
          timeLimit: reactivateProduct.timeLimit,
          timeUnit: reactivateProduct.timeUnit,
        }
      );

      alert(response.data.message);
      setInactiveProducts((prev) =>
        prev.filter((product) => product._id !== reactivateProduct.productId)
      );
      setReactivateProduct({ productId: "", timeLimit: "", timeUnit: "hours" });
    } catch (err) {
      alert(err.response?.data?.error || "Error reactivating product.");
    }
  };

  if (loading) return <div>Loading inactive products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="adminPage">
        <div className="sidepanel">
          <ul className="adminSetting">
            <li className="sidepanellist " id="dashohome">
              <h1>
                <FaHome /> Dasho
              </h1>
            </li>
            <li
              className={`sidepanellist ${
                selectedItem === "Dashboard" ? "selected" : ""
              }`}
              onClick={() => handleClick("Dashboard")}
            >
              <FaChartBar /> Dashboard
            </li>
            <li
              className={`sidepanellist ${
                selectedItem === "Upload" ? "selected" : ""
              }`}
              onClick={() => handleClick("Upload")}
            >
              <FaFileUpload /> Upload Item
            </li>
            <li
              className={`sidepanellist ${
                selectedItem === "Products" ? "selected" : ""
              }`}
              onClick={() => handleClick("Products")}
            >
              <FaListAlt /> Products
            </li>
            <li
              className={`sidepanellist ${
                selectedItem === "Inactive" ? "selected" : ""
              }`}
              onClick={() => {
                handleClick("Inactive");
                showInactiveProducts();
              }}
            >
              <FaExclamationTriangle /> Inactive Products
            </li>
            <li
              className={`sidepanellist ${
                selectedItem === "Orders" ? "selected" : ""
              }`}
              onClick={() => handleClick("Orders")}
            >
              <FaBoxes /> Orders
            </li>
            <li
              className={`sidepanellist ${
                selectedItem === "ShippedOrders" ? "selected" : ""
              }`}
              onClick={() => handleClick("ShippedOrders")}
            >
              <FaTruck /> Shipped Orders
            </li>
            <li
              className={`sidepanellist ${
                selectedItem === "CompletedOrders" ? "selected" : ""
              }`}
              onClick={() => handleClick("CompletedOrders")}
            >
              <FaCheckCircle /> Completed Orders
            </li>
            <li
              className={`sidepanellist ${
                selectedItem === "Support" ? "selected" : ""
              }`}
              onClick={() => handleClick("Support")}
            >
              <FaUserCog /> Support
            </li>
            <li
              className={`sidepanellist ${
                selectedItem === "Feedback" ? "selected" : ""
              }`}
              onClick={() => handleClick("Feedback")}
            >
              <FaCommentAlt /> Customer Feedback
            </li>
            <li className="visit-shop-list-item" style={{ cursor: "pointer" }}>
              <Link
                to="/shop"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <IoMdSettings /> Visit Your Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* =============================================   DashBoard ========================================================= */}
        {selectedItem === "Dashboard" && (
          <div className="dashboard">
            <div className="section" id="sales-performance">
              <div className="section-heading">
                <h2>
                  <FaChartBar /> Sales Performance
                </h2>{" "}
              </div>{" "}
              <p>
                <b>Total Sales: </b> $20,000
              </p>
              <p>
                <b>Number of Orders:</b> 150
              </p>
              <p>
                <b>Average Order Value (AOV): </b> $133.33
              </p>
              <p>
                <b>
                  Sales Trends: <span>[Graph Placeholder]</span>
                </b>
              </p>
            </div>

            <div className="section" id="product-performance">
              <div className="section-heading">
                <h2>Product Performance</h2>{" "}
              </div>
              <p>
                <b>Top Selling Products:</b> Product A, Product B, Product C
              </p>
              <p>
                <b> Product Views:</b> Product A - 200, Product B - 150, Product
                C - 100
              </p>
            </div>

            <div className="section" id="customer-insights">
              <div className="section-heading">
                <h2>Customer Insights</h2>{" "}
              </div>
              <p>
                <b>Customer Demographics: </b> 60% Female, 40% Male
              </p>
              <p>
                <b>Repeat Customer Rate: </b> 25%
              </p>
              <p>
                <b>Customer Feedback Ratings: </b> 4.5/5
              </p>
            </div>

            <div className="section" id="financial-metrics">
              <div className="section-heading">
                {" "}
                <h2>Financial Metrics</h2>
              </div>
              <p>
                <b>Revenue: </b> $20,000
              </p>
              <p>
                <b>Expenses: </b> $5,000
              </p>
              <p>
                <b>Payouts: </b>$15,000 (Completed)
              </p>
            </div>

            <div className="section" id="marketing-analytics">
              <div className="section-heading">
                <h2>Marketing Analytics</h2>
              </div>

              <p>
                <b>Traffic Sources: </b>50% Direct, 30% Referral, 20% Ads
              </p>
              <p>
                <b>Conversion Rate: </b> 5%
              </p>
            </div>

            <div className="section" id="operational-metrics">
              <div className="section-heading">
                <h2>Operational Metrics</h2>
              </div>
              <p>
                <b>Order Fulfillment Rate: </b> 95%
              </p>
              <p>
                <b>Shipping Performance:</b> Average shipping time - 2 days
              </p>
              <p>
                <b>Support Tickets:</b> 20 open tickets
              </p>
            </div>

            <div className="section" id="promotional-performance">
              <div className="section-heading">
                {" "}
                <h2>Promotional Performance</h2>
              </div>
              <p>
                <b>Promotion Results:</b> 30% increase in sales during the last
                campaign
              </p>
              <p>
                <b>Coupon Usage:</b> 25% of customers used coupons
              </p>
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
                  accept="image/*"
                  onChange={handleItemImageChange}
                  required
                />
              </div>

              {/* Count Field */}
              <div className="form-fields">
                <label htmlFor="productCount">Number of Products:</label>
                <input
                  type="number"
                  id="productCount"
                  value={productCount}
                  onChange={handleProductCountChange}
                  required
                />
              </div>

              {/* Time Limit Fields */}
              <div className="form-fields">
                <label htmlFor="timeUnit">Time Unit:</label>
                <select
                  id="timeUnit"
                  value={timeUnit}
                  onChange={handleTimeUnitChange}
                  required
                >
                  <option value="">--Select Time Unit--</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
              <div className="form-fields">
                <label htmlFor="timeLimit">Time Limit:</label>
                <input
                  type="number"
                  id="timeLimit"
                  value={timeLimit}
                  onChange={handleTimeLimitChange}
                  required
                />
              </div>

              <button className="sellerbtn" type="submit">
                Upload
              </button>
            </form>
            <p id="sellerbtn"></p>
            <br />
          </div>
        )}

        {/* ================================================= Products Available ==================================================== */}
        {selectedItem === "Products" && (
          <div className="showItems">
            <h1>Available Products</h1>
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Action</th>
                  <th>Active Status</th>
                </tr>
              </thead>
              <tbody>
                {res.map((item) => {
                  if (item.sellerEmail === userEmail) {
                    return (
                      <tr key={item._id}>
                        <td>
                          <img
                            className="photo"
                            src={`http://localhost:3000/` + item.itemImage}
                            alt="item"
                          />
                        </td>
                        <td>{item.itemName}</td>
                        <td>{item.itemPrice}</td>
                        <td>{item.itemDescription}</td>
                        <td>
                          <button onClick={() => deleteData(item._id)}>
                            Delete
                          </button>
                        </td>
                        <td style={{ color: item.isActive ? "green" : "red" }}>
                          {item.isActive ? "Active" : "Inactive"}
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

        {/* =========================Inactive Products================================= */}
        {selectedItem === "Inactive" && (
          <div className="inactive-products-container">
            <h1 className="inactive-products-title">Inactive Products</h1>
            {inactiveProducts.length === 0 ? (
              <p className="no-products-message">No inactive products found.</p>
            ) : (
              <table className="inactive-products-table">
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Expiry Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inactiveProducts.map((product) => (
                    <tr key={product._id} className="inactive-product-item">
                      <td>
                        <img
                          className="photo"
                          src={`http://localhost:3000/` + product.itemImage}
                          alt="productImage"
                        />
                      </td>{" "}
                      <td className="product-name">{product.itemName}</td>
                      <td className="product-price">₹{product.itemPrice}</td>
                      <td className="product-description">
                        {product.itemDescription}
                      </td>
                      <td className="product-expiry">
                        {new Date(product.expiryDate).toLocaleString()}
                      </td>
                      <td className="product-status">
                        {product.isActive ? "Active" : "Inactive"}
                      </td>
                      <td>
                        <button
                          className="reactivate-button"
                          onClick={() =>
                            setReactivateProduct({
                              ...reactivateProduct,
                              productId: product._id,
                            })
                          }
                        >
                          Reactivate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {reactivateProduct.productId && (
              <div className="reactivate-form-container">
                <h2 className="reactivate-form-title">Reactivate Product</h2>
                <form className="reactivate-form" onSubmit={handleReactivate}>
                  <label className="form-label">
                    Time Limit:
                    <input
                      className="form-input"
                      type="number"
                      value={reactivateProduct.timeLimit}
                      onChange={(e) =>
                        setReactivateProduct({
                          ...reactivateProduct,
                          timeLimit: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label className="form-label">
                    Time Unit:
                    <select
                      className="form-select"
                      value={reactivateProduct.timeUnit}
                      onChange={(e) =>
                        setReactivateProduct({
                          ...reactivateProduct,
                          timeUnit: e.target.value,
                        })
                      }
                    >
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                    </select>
                  </label>
                  <button className="form-submit-button" type="submit">
                    Reactivate
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* =============================Orders==================================== */}
        {selectedItem === "Orders" && (
          <div className="sellerOrderPage">
            <h1 className="dashboardTitle">Seller Order Dashboard</h1>
            {loading ? (
              <p className="loadingMessage">Loading orders...</p>
            ) : (
              <div className="ordersContainer">
                {orders.length > 0 ? (
                  <ul className="orderList">
                    {orders.map((order) => (
                      <li key={order._id} className="orderItem">
                        <div className="orderDetails">
                          <p className="orderId">
                            <strong>Order ID:</strong> {order._id}
                          </p>
                          <div className="customerDetails">
                            <p>CustomerId: {order.customer.customerId}</p>
                            <p>Name: {order.customer.firstName}</p>
                            <p>Address: {order.customer.address1}</p>
                          </div>
                          <div className="orderItems">
                            {order.items
                              .filter(
                                (item) => item.id === sellerId
                              ) // Replace `currentSellerId` with the actual seller ID variable
                              .map((item) => (
                                <div key={item.id} className="orderItemDetails">
                                  <div className="orderInfo">
                                  <ul className="itemDetailsList">
                                    <li>
                                      <img
                                        className="itemImage"
                                        src={
                                          `http://localhost:3000/` +
                                          item.itemImage
                                        }
                                        alt="productImage"
                                      />
                                    </li>
                                    <li className="itemName">
                                      {item.itemName}
                                    </li>
                                    <li className="itemPrice">
                                      {item.itemPrice}
                                    </li>
                                    <li className="itemQuantity">
                                      {item.quantity}
                                    </li>
                                    <li className="itemStatus">
                                      {item.status}
                                    </li>
                                  </ul>
                                  </div>
                                 
                                  <div className="statusButtons orderInfo">
                                    <button
                                      className="statusButton shippedButton"
                                      onClick={() =>
                                        updateOrderStatus(
                                          order._id,
                                          item._id,
                                          "Shipped"
                                        )
                                      }
                                    >
                                      <FaCheck /> Shipped
                                    </button>
                                    <button
                                      className="statusButton cancelledButton"
                                      onClick={() =>
                                        updateOrderStatus(
                                          order._id,
                                          item._id,
                                          "Cancelled"
                                        )
                                      }
                                    >
                                      <FaTimes /> Cancelled
                                    </button>
                                    <button
                                      className="statusButton deliveredButton"
                                      onClick={() =>
                                        updateOrderStatus(
                                          order._id,
                                          item._id,
                                          "Delivered"
                                        )
                                      }
                                    >
                                      <FaExclamationTriangle /> Delivered
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="noOrdersMessage">No orders available.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================================ShippedOrders============================== */}
        {selectedItem === "ShippedOrders" && (
          <div>
            <h1>ShippedOrders</h1>
          </div>
        )}

        {/* ==============================CompletedOrders========================= */}
        {selectedItem === "CompletedOrders" && (
          <div>
            <h1>CompletedOrders</h1>
          </div>
        )}

        {/* =============================Support====================================== */}
        {selectedItem === "Support" && (
          <div>
            <h1>Support</h1>
          </div>
        )}

        {/* ==============================Feedback====================================== */}
        {selectedItem === "Feedback" && (
          <div>
            <h1>Feedback</h1>
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
                      <button
                        type="button"
                        id="shippingBtn"
                        data-order-id={order._id}
                        onClick={() => handleShipOrder(orderData, order._id)}
                      >
                        Ship
                      </button>
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

        {isShipped && (
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
