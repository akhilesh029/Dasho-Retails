import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors

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

  return (
    <AppContext.Provider value={{ shops, loading, error }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
