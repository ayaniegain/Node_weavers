import React, { createContext, useContext, useReducer } from "react";
import { useFetchData } from "./FetchData";

let wishListContext = createContext();

let initiallist = [];

function WishListContextList({ children }) {
  const { allProducts, setAllProducts } = useFetchData();

  function wishListReducer(state, action) {
    switch (action.type) {
      case "ADD_ITEM": {
      

        return [...state, allProducts.find((item) => item.id === Number(action.payload))];
      }

      case "REMOVE_ITEM": {
        

        return state.filter((item) => item.id !== Number(action.payload));
      }

      default:
        return state;
    }
  }

  const [wishlist, dispatch] = useReducer(wishListReducer, initiallist);

  return <wishListContext.Provider value={{ wishlist, dispatch }}>{children}</wishListContext.Provider>;
}

export default WishListContextList;

export function useFetchWishList() {
  return useContext(wishListContext);
}
