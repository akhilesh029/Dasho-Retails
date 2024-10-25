

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home/Home'

import ShowOnHOme from './componets/ShowOnHome/ShowOnHome';
import Clothes from './Pages/Clothes/Clothes';
import Header from './componets/Header/Header';
import Navbar from './componets/Navbar/Navbar';
import Footer from './componets/Footer/Footer';
import FirebaseAuth from './componets/Firebase/FirebaseAuth';
import SellerLogin from './Pages/SellerLogin/SellerLogin';
import WelcomePage from './Pages/WelcomePage/WelcomePage';
import SellerPage from './Pages/SellerPage/SellerPage';
import SellerCreateAccount from './Pages/CreateAccOfSeller/CreateAccOfSeller';
import BuyItems from './Pages/BuyItems/BuyItems';
import PayMethod from './Pages/PayMethod/PayMethod';



function App() {
  return (
    <>
    
   <BrowserRouter>
   <div className='headerrrr'>

   <Header />
   <Navbar />
   </div>
   <div className="renderpages">


      <Routes  >
          <Route path='/' element ={<Home />} />
          <Route path='/clothes'  element={<Clothes />} />
          <Route path='/showonhome' element = {<ShowOnHOme />} />
          <Route path='/firebaseAuth' element = {<FirebaseAuth />}/>
          <Route path='/sellerlogin' element = {<SellerLogin />}/>
          <Route path='/createselleracc' element = {<SellerCreateAccount />}/>
          <Route path='/welcome' element = {<WelcomePage />}/>
          <Route path='/sellerpage' element = {<SellerPage />}/>
          <Route path='/buyitems' element = {<BuyItems />}/>
          <Route path='/pay' element = {<PayMethod />}/>

          
      
      </Routes>
   </div>
<Footer />
    </BrowserRouter>
    
    </>
  );
}

export default App;

 