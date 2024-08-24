import React, { useState } from 'react';
import axios from 'axios';

import './CreateAccOfSeller.css'
import Header from '../../componets/Header/Header';

import {  useNavigate } from 'react-router-dom';

const SellerCreateAccount = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState(''); 
const navigate = useNavigate()

const handleSubmit =  (event) => {
  const regiSucc = document.getElementById('registerSuccess')
    event.preventDefault();
    axios.post('http://localhost:3000/register', {name, email, password})
    .then(result =>{ 
      console.log(result)
      regiSucc.innerHTML = "Registered Successfully!"
      regiSucc.style.color = "#7CFC00"
       setInterval(() => {
         navigate('/sellerlogin')
        
       }, 4000);
    })
    .catch(err=> console.log(err))

}


return (
<>

<Header />

<div className="create-account-container">
<h2> Create Seller Account</h2>
<form onSubmit={handleSubmit}>
<div className="input-group">
<label htmlFor="name">Name:</label>
<input
type="text"
id="name"
name="name"
value={name}
onChange={(e) => setName(e.target.value)}
required
/>
</div>
<div className="input-group">
<label htmlFor="email">Email:</label>
<input
type="email"
id="email"
name="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</div>
<div className="input-group">
<label htmlFor="password">Password:</label>
<input
type="password"
id="password"
name="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</div>
<button className='createbtn' type="submit">Create Account</button>
<div className="log">
  If you are already register <a href='/sellerlogin'>click here.</a>
</div>
<p id='registerSuccess' ></p>
{errorMessage && <p className="error-message">{errorMessage}</p>}
</form>
</div>

</>
);
};   

export default SellerCreateAccount;