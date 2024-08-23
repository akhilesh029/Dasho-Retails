import React, { createContext,useState } from 'react'

export const AppContext = createContext();


const ContextProvider = (props)=>{
         const price ="2675"
        //  const name = "Akhil"

      


         return (
           <AppContext.Provider value = {price} >
              {props.children}
             
           </AppContext.Provider>
         )
}
export default ContextProvider


