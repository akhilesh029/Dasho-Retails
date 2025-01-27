import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; // Import icons from React Icons

import "./UserPage.css";

const UserPage = () => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  // Use the useLocation hook to get the state passed from the previous page
  const location = useLocation();

  // Access the email from the state
  const { email } = location.state || {};

  useEffect(() => {
    // Fetch customer details when the component mounts
    axios
      .get(`http://localhost:3000/customer`, { params: { email } })
      .then((response) => {
        setCustomer(response.data.customer);
      })
      .catch((err) => {
        setError("Error fetching customer details");
        console.error(err);
      });
  }, [email]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!customer) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h2>Customer Profile</h2>
      <div className="profile-details">
        <div className="customer-card">
          <h3>
            {customer.firstName} {customer.lastName}
          </h3>
          <ul>
            <li>
              <FaEnvelope className="icon" /><strong>Email:</strong> {customer.email}
            </li>
            <li>
              <FaPhone className="icon" /><strong>Phone:</strong> {customer.phoneNumber}
            </li>
            <li>
              <FaMapMarkerAlt className="icon" /><strong>Address 1:</strong> {customer.address1}
            </li>
            {customer.address2 && (
              <li>
                <FaMapMarkerAlt className="icon" /><strong>Address 2:</strong> {customer.address2}
              </li>
            )}
            <li>
              <FaMapMarkerAlt className="icon" /><strong>Pin Code:</strong> {customer.pinCode}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserPage;