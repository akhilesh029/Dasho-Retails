import React, { useState } from "react";
import ContextProvider, { AppContext } from "../../context/AppContext";
import axios from "axios";
import "./SellerLogin.css";
import Header from "../../componets/Header/Header";
import { useNavigate } from "react-router-dom";
import UserPage from "../UserPage/UserPage";

// import SellerPage from '../SellerPage/SellerPage';


const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const loginSucc = document.getElementById("info");

    event.preventDefault();

    axios.post('http://localhost:3000/sellerlogin', {email,password})
    .then(result=>{
      setUserData(userData=>result.userData)
      const userData = {email, password}
      console.log(userData)
      

      // console.log(result)
      // console.log(result.name)
      // console.log(result.email)
      if(result.data === "Success"){
        // console.log(email)
        console.log(userData.name)
        // console.log(result)
       
        
        loginSucc.innerHTML = "Login Succesfully!"
        loginSucc.style.color = "#7CFC00"
       
          navigate('/user')
          
       
      }
      else{
        loginSucc.innerHTML = "User not found!"
        loginSucc.style.color = "#ff0000"
      }
    })
    .catch(err=>console.log(err))
}


    axios
      .post("http://localhost:3000/sellerlogin", { email, password })
      .then((result) => {
        setUserData((userData) => result.userData);
        const userData = { email, password };
        // console.log(userData)

        if (result.data === "Success") {
          loginSucc.innerHTML = "Login Succesfully!";
          loginSucc.style.color = "#7CFC00";
          setTimeout(() => {
            navigate("/welcome", { replace: true, state: { email } });
          }, 1000);
        } else {
          loginSucc.innerHTML = "User not found!";
          loginSucc.style.color = "#ff0000";
        }
      })
      .catch((err) => console.log(err));
  

  return (
    <>
      <Header />
      <div className="login-container">
        <h2>Seller Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="email..."
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
              placeholder="password..."
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="createbtn" type="submit">
            Login
          </button>
          {/* {userData && <UserPage userData={userData} />} */}

          {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
          <a className="createAcc" href="/createselleracc">
            Create seller account
          </a>
          <p id="info"></p>
        </form>
      </div>
    </>
  );

};

export default SellerLogin;
