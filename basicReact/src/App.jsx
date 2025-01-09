import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home'


import ShowOnHOme from './componets/ShowOnHome/ShowOnHome';
// import ShowOnHme from './componets/ShowOnHome/ShowOnHOme';

// import ShowOnHOme from './componets/ShowOnHome/ShowOnHOme';

import Clothes from './Pages/Clothes/Clothes';
import Header from './componets/Header/Header';
import Navbar from './componets/Navbar/Navbar';
import Footer from './componets/Footer/Footer';
// import ShowOnHome from './componets/ShowOnHome/ShowOnHOme.';
import FirebaseAuth from './componets/Firebase/FirebaseAuth';
import SellerLogin from './Pages/SellerLogin/SellerLogin';
import WelcomePage from './Pages/WelcomePage/WelcomePage';
import SellerPage from './Pages/SellerPage/SellerPage';
import SellerCreateAccount from './Pages/CreateAccOfSeller/CreateAccOfSeller';
import BuyItems from './Pages/BuyItems/BuyItems';
import PayMethod from './Pages/PayMethod/PayMethod';
import Form from './Pages/detailsVerification/detailsVerification';
import BusinessForm from './Pages/BusinessForm/BusinessForm';
import DistributionForm from './Pages/DistributionForm/DistributionForm';
import Distributors from './Pages/Distributors/Distributors';
import PricingTable from './Pages/PremiumPlan/PremiumPlan';
import ShopPage from './Pages/ShopPage/ShopPage';
// import AllShop from './components/AllShop/AllShop';


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
          <Route path='/clothes'  element={<Clothes />} />
          {/* <Route path='/showonhome' element = {<ShowOnHOme />} /> */}
          <Route path='/firebaseAuth' element = {<FirebaseAuth />}/>
          <Route path='/sellerlogin' element = {<SellerLogin />}/>
          <Route path='/createselleracc' element = {<SellerCreateAccount />}/>
          <Route path='/welcome' element = {<WelcomePage />}/>
          <Route path='/sellerpage' element = {<SellerPage />}/>
          <Route path='/buyitems' element = {<BuyItems />}/>
          <Route path='/pay' element = {<PayMethod />}/>
          <Route path='/form' element = {<Form />}/>
          <Route path='/businessform' element = {<BusinessForm />}/>
         

          <Route path='/pricingtable' element = {<PricingTable />}/>
          <Route path='/shop/:email' element = {<ShopPage />}/>
      </Routes>
   </div>
<Footer />
    </BrowserRouter>
    
    </>
  );

}

export default App;

 