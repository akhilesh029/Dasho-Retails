import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors
  const [cartItems, setCartItems] = useState({}); 
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  

  // Fetch data from the backend
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/shops");
        setShops(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.error("Error fetching shops:", err);
        setError("Failed to fetch shop details.");
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchShops();
  }, []); // Run this effect once when the component mounts



  // =============================================ADD TO CART=======================================================================
  const addtoCart = async(itemId) => {
    if(!cartItems[itemId]){
       setCartItems((prev)=>({...prev,[itemId]:1}))  // setting quantity to 1.
     }
    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))   // increase quantity by 1.
     }
    // if(token){
    //     await axios.post( url+"/api/cart/add",{itemId},{headers:{token}})  //whatever we added in cart updates in DB also.
    //  }
    }


const removeFromCart = async(itemId) => {
   setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
  //  if(token){
  //   await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
  //  }
   }



//  const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for(const item in cartItems){
//         if( cartItems[item] > 0 ){  
//          let itemInfo = food_list.find((product)=>product._id === item);
//          totalAmount += itemInfo.price* cartItems[item];
//         }  
//     }
//     return totalAmount;
//  }



//  const fetchFoodList = async ()=> {
//           const response = await axios.get(url+"/api/food/list");
//           setFoodList(response.data.data);
//  }


// // fuction to load cart item data from db if page refresh it will fetch from db
//  const loadCartData = async (token) =>{
//        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
//        setCartItems(response.data.cartData);
       
//  }






const contextValue = {
  shops,
  loading,
  error,
  // setCartItems,
  addtoCart,
  removeFromCart,
  selectedItems, 
  setSelectedItems,
  cartTotal,
  setCartTotal
  
}


  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
