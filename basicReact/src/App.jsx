import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home'


//import ShowOnHOme from './componets/ShowOnHome/ShowOnHome';
// import ShowOnHme from './componets/ShowOnHome/ShowOnHOme';

// import ShowOnHOme from './componets/ShowOnHome/ShowOnHOme';

import Header from './componets/Header/Header';
import Navbar from './componets/Navbar/Navbar';
import Footer from './componets/Footer/Footer';

import FirebaseAuth from './componets/Firebase/FirebaseAuth';
import WelcomePage from './Pages/WelcomePage/WelcomePage';
import SellerPage from './Pages/SellerPage/SellerPage';
import BuyItems from './Pages/BuyItems/BuyItems';
import PayMethod from './Pages/PayMethod/PayMethod';
import BusinessForm from './Pages/BusinessForm/BusinessForm';
import CustomerForm from './Pages/CustomerForm/CustomerForm';
import ShopPage from './Pages/ShopPage/ShopPage';
import CartPage from './Pages/CartPage/CartPage';
import Placeorder from './Pages/Placeorder/Placeorder';
import UserPage from './Pages/UserPage/UserPage';


function App() {
  // const isShopPage = location.pathname.startsWith('/shop/');
  return (
    <>
    
   <BrowserRouter>
  
   <div className='fixedArea'>
      <Header />
      <Navbar />
   </div>

   <div className="renderpages">
      <Routes  >
          <Route path='/' element ={<Home />} />
          <Route path='/cart' element ={<CartPage />} />
          <Route path='/order' element ={<Placeorder />} />
         
          {/* <Route path='/showonhome' element = {<ShowOnHOme />} /> */}
          <Route path='/firebaseAuth' element = {<FirebaseAuth />}/>
          <Route path='/welcome' element = {<WelcomePage />}/>
          <Route path='/sellerpage' element = {<SellerPage />}/>
          <Route path='/buyitems' element = {<BuyItems />}/>
          <Route path='/pay' element = {<PayMethod />}/>
          <Route path='/businessform' element = {<BusinessForm />}/>
          <Route path= '/customerform' element = {<CustomerForm />}/>
          <Route path='/userpage' element = {<UserPage />}/>
         

         
          <Route path='/shop/:email' element = {<ShopPage />}/>
      </Routes>
   </div>
<Footer />
    </BrowserRouter>
    
    </>
  );

}

export default App;

 