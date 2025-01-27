
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx"
import './App.css'
import {BrowserRouter,Routes} from 'react-router-dom'
import StoreContextProvider from './context/AppContext.jsx'





import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './componets/Header/Header.jsx'
import Navbar from './componets/Navbar/Navbar.jsx'
// import MainDiv from './componets/MainDiv/MainDiv.jsx'

import ContextProvider from './context/AppContext.jsx';

import {
  createBrowserRouter,
  // createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import UserPage from './Pages/UserPage/UserPage.jsx';
import SellerPage from './Pages/SellerPage/SellerPage.jsx';
import WelcomePage from './Pages/WelcomePage/WelcomePage.jsx';
import BuyItems from './Pages/BuyItems/BuyItems.jsx';
import CartPage from './Pages/CartPage/CartPage.jsx';
import ShowOnHOme from './componets/ShowOnHome/ShowOnHome.jsx';
import PayMethod from './Pages/PayMethod/PayMethod.jsx';
import ShopPage from './Pages/ShopPage/ShopPage.jsx'

 


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      {/* <RouterProvider router={router} /> */}
      <App />
    </ContextProvider>
  </React.StrictMode>
);
