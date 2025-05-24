import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

let initialState = {
  value: [],
  loginUser: JSON.parse(localStorage.getItem("authUser")) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      let storedUsers = JSON.parse(localStorage.getItem("authRegister")) || [];
      state.value = [...storedUsers, { ...action.payload }];
      localStorage.setItem("authRegister", JSON.stringify(state.value));
    },
    signIn: (state, action) => {
      state.loginUser = { ...action.payload };
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.loginUser = null;
    },
  },
});

export const { signIn, signUp, logOut } = authSlice.actions;
export default authSlice.reducer;

export function useAuth() {
  return useSelector((state) => state.auth);
}
