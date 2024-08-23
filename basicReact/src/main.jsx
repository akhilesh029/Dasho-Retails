import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import Header from './componets/Header/Header.jsx'
import Navbar from './componets/Navbar/Navbar.jsx'
import MainDiv from './componets/MainDiv/MainDiv.jsx'
import Features from './componets/Features/Features.jsx'
import Clothes from './Pages/Clothes/Clothes.jsx'
import ContextProvider from './contexts/AppContext.jsx';

import {
  createBrowserRouter,
  // createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Clothes/Home/Home.jsx';


// const router = createBrowserRouter([
//     {
      
//         path: '/',
//         element: <App />
      
//     },
//     {
//         path: '/home',
//         element: <Home />
      
//     },
//     {
//         path: '/clothes',
//         element: <Clothes />
      
//     },
  
// ]);



createRoot(document.getElementById('root')).render(

  // <RouterProvider router={router} />
  <ContextProvider>
    <App />
  </ContextProvider>
 
    // <App /> 
    // <Header />
    // <Navbar />
    // <MainDiv />
    // <Features/> 
    // <Clothes />
   

)
