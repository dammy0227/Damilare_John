import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin } from "../../services/auth";

export const adminLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await loginAdmin(username, password);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
