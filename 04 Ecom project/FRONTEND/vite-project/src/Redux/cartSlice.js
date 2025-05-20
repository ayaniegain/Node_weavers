import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

let initialState = {
  value: [],
};

export let cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {

      state.value = [...state.value, { ...action.payload }];
      // state.value.push(action.payload)
    },
    incQty: (state, action) => {
      state.value.map((item) => {
        if (item.id === action.payload) {
          return item.quantity++;
        }

        return item;
      });
    },
    decQty: (state, action) => {
      state.value.map((item) => {
        if (item.id === action.payload) {
          return item.quantity <=1? 1 : item.quantity--;
        }

        return item;
      });
    },
    deleteCart: (state, action) => {
      state.value = state.value.filter(
        (item) => item.id !== Number(action.payload)
      );
    },
   clearCart: (state) => {

   return initialState
    },
  },
});



export let { addToCart, incQty, decQty, deleteCart,clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export function useFetchCart() {
  return useSelector((state) => state.cart.value);
}
