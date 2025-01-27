import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


import './App.css'
import WelcomePage from './components/WelcomePage/WelcomePage'
import FirebaseAuth from './components/FirebaseAuth/FirebaseAuth'
import SellerPage from './components/SellerPage/SellerPage'
import BusinessForm from './components/BusinessForm/BusinessForm'
import Header from './components/Header/Header'
import SellerOrderPage from './components/sellerOrderPage/sellerOrderPage'

function App() {
  

  return (
    <Router>
      <Header />
      <div>
       <Routes>
           <Route path="/" element={<WelcomePage />} />
           <Route path="/firebaseAuth" element={<FirebaseAuth />} />
           <Route path='/sellerpage' element={<SellerPage />} />  
           <Route path='/businessform' element={<BusinessForm />} />
           <Route path='/orders' element={<SellerOrderPage />}/>

       </Routes>
      
      
      </div>
      
    </Router>
  )
}

export default App
