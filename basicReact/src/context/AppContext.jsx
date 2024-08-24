import React, { createContext,useState } from 'react'

export const AppContext = createContext();


const ContextProvider = (props)=>{
         const price ="2000"
         const name = "Stylish fancy women-Kurta"
    
         return (
           <AppContext.Provider value={{price,name} }>
              {props.children}
             
           </AppContext.Provider>
         )
}
export default ContextProvider


