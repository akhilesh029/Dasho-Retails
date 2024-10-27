import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './distributors.css'
import { useNavigate } from 'react-router-dom';
import DistributionForm from '../DistributionForm/DistributionForm';




const Distributors = () => {
   
    // const [distributor, setDistributor] = useState();
    const [users, setUsers] = useState()
    const navigate = useNavigate()
  
  function handledistributor(){

      axios
      .get("http://localhost:3000/user")
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
      if(users){
          console.log(users)
          console.log(users[0])

      }
      // console.log(users.length)
      //    const userEmail = users.email
      //    console.log(userEmail)
  }
   
  function handlegotoshop(){
    navigate("/distributionform", { replace: false, state: { users } });
  }
    
   
   

  return (
    <>
      <div id="distributors-header">
        <h2>Distributors</h2>
        <button id="see-distributors-button" onClick={handledistributor}>See Distributors</button>
      </div>

      <ul className="business-list">
        {users && users.map((business, index) => (
    
          <li key={index} className="business-item">
            <h3>Business {index + 1}</h3>
            <p>Business Name: {business.businessName}</p>
            <p>Owner Name: {business.ownerName}</p>
            <p>Contact Number: {business.contactNumber || business.businessContactNumber}</p>
            <button onClick={handlegotoshop} id='see-product-button' key={business.email}>Move to Shop </button>
          </li>
          
          
        ))}
      </ul>
     
    </>
  )
};

export default Distributors