import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "./authThunk";

// Get initial state from localStorage if it exists
const token = localStorage.getItem("token");
const adminInfo = localStorage.getItem("admin");

const initialState = {
  admin: adminInfo ? JSON.parse(adminInfo) : null,
  loading: false,
  error: null,
  token: token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    },
    clearError: (state) => { 
      state.error = null; 
    },
    // Add a new action to update auth state
    setAuth: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.token = action.payload.token;
        // Store in localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("admin", JSON.stringify(action.payload));
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, setAuth } = authSlice.actions;
export default authSlice.reducer;