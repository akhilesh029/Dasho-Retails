import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import Header from './componets/Header/Header.jsx'
import Navbar from './componets/Navbar/Navbar.jsx'
import MainDiv from './componets/MainDiv/MainDiv.jsx'
import Features from './componets/Features/Features.jsx'
import Clothes from './Pages/Clothes/Clothes.jsx'
import Cosmetics from './Pages/Clothes/Cosmetics/Cosmetics.jsx';
import Clothesdetails from './Pages/Clothes/Clothesdetails/Clothesdetails.jsx';
import ContextProvider from './context/AppContext.jsx';

import {
  createBrowserRouter,
  // createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Clothes/Home/Home.jsx';
import Pharmaceuticals from './Pages/Pharmaceutical/Pharmaceutical.jsx';
import Cosmeticsdetails from './Pages/Details/Cosmeticdetails/Cosmeticsdetails.jsx';
import Pharmaceuticaldetails from './Pages/Details/Pharmaceutical/Pharmaceuticaldetails.jsx';
import SellerCreateAccount from './Pages/CreateAccOfSeller/CreateAccOfSeller.jsx';
import SellerLogin from './Pages/SellerLogin/SellerLogin.jsx'
import UserPage from './Pages/UserPage/UserPage.jsx';

const router = createBrowserRouter([
    {
      
        path: '/',
        element: <App />
      
    },
    {
        path: '/home',
        element: <Home />
      
    },
    {
        path: '/clothes',
        element: <Clothes />
      
    },
    {
        path: '/clothesdetails',
        element: <Clothesdetails />
      
    },
  
    {
        path: '/cosmetics',
        element: <Cosmetics />
      
    },
    {
      path: '/cosmeticsdetails',
      element: <Cosmeticsdetails />
    
  },
  
    {
        path: '/pharmaceuticals',
        element: <Pharmaceuticals />
      
    },
    {
        path: '/pharmaceuticaldetails',
        element: <Pharmaceuticaldetails />
      
    },
    {
        path: '/createselleracc',
        element: <SellerCreateAccount />
    },
    {
       path: '/sellerlogin' ,
       element: <SellerLogin />
      
    },
    {
       path: '/user',
       element: <UserPage />
      
    }

  
]);



createRoot(document.getElementById('root')).render(
<ContextProvider>

  <RouterProvider router={router} />
</ContextProvider>
  // <ContextProvider>
  //    <App />
  // </ContextProvider>
 
    // <App /> 
    // <Header />
    // <Navbar />
    // <MainDiv />
    // <Features/>

    // <Clothes />
   

)
