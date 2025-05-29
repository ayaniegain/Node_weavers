import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { loginAuth, registerAuth } from "../../API/auth.API";

export const fetchRegisterAuth = createAsyncThunk(
  "users/fetchRegUser",
  async (message, thunkAPI) => {
    try {
      const response = await registerAuth(message);
      return response;
    } catch (error) {

      console.log(error)
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const fetchLoginAuth = createAsyncThunk(
  "users/fetchLoginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await loginAuth(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

let initialState = {
  message: null,
  loading: false,
  success: false,
  error: null,
  loginUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
       state.message = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    logout: (state) => {
      state.message = null;
      state.loading = false;
      state.loginUser = null;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegisterAuth.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.loading = false;
      })
      .addCase(fetchRegisterAuth.rejected, (state, action) => {
         state.error = action.payload.message;
        state.success = false;
        state.loading = false;
      })
      .addCase(fetchLoginAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoginAuth.fulfilled, (state, action) => {
      console.log(action.payload)
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.loginUser = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchLoginAuth.rejected, (state, action) => {

        state.error = action.payload.message;
        state.success = false;
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;

export function useAuth() {
  return useSelector((state) => state.auth);
}
