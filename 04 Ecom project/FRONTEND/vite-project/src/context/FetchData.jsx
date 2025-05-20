import React, { useEffect, useState, createContext, useContext } from "react";

const FetchDataContext = createContext();

function FetchData({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [cartDetails, setCartDetails] = useState({});

  async function getAllProducts() {
    try {
      let response = await fetch("../../public/data/sample_data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      let data = await response.json();

      setAllProducts(data.products.map((item) => ({ ...item, quantity: 1, wishList: false })));
      setOriginalProducts(
        data.products.map((item) => ({ ...item, quantity: 1 }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  
 function showCartDetails(totalPrice, Cartlength, deliveryCharge) {
  setCartDetails({ totalPrice, Cartlength, deliveryCharge });
}

  return (
    <FetchDataContext.Provider
      value={{ allProducts, setAllProducts, originalProducts,cartDetails ,showCartDetails}}
    >
      {children}
    </FetchDataContext.Provider>
  );
}

export default FetchData;

export function useFetchData() {
  return useContext(FetchDataContext);
}

