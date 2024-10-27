import React, { useState } from 'react';
import './detailsVerification.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';

function Form(props) {
    const location = useLocation();
    const userEmail = location.state
    console.log(userEmail.email)
    const email = userEmail.email

    const navigate = useNavigate()


  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    gst: '',
    email: `${userEmail.email}`,
  });

  

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // You can submit this data to a server or perform other actions

    // const formdata = new formData();
    try {
        const response =  axios.post("http://localhost:3000/savedetails", formData, {
        
        },
        navigate('/welcome', {replace:true, state:{email}})
    );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }

  };

  return (
    <form id='detailsform' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="contact">Contact Number:</label>
        <input
          type="tel"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="gst">GST Number:</label>
        <input
          type="text"
          id="gst"
          name="gst"
          value={formData.gst}
          onChange={handleChange}
        />
      </div>

      <button className='detailsbutton' type="submit">Submit</button>
    </form>
  );
}

export default Form;