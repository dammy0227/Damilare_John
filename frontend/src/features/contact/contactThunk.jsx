import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessage } from "../../services/email";

export const sendContactMessage = createAsyncThunk(
  "contact/send",
  async ({ name, email, message }, { rejectWithValue }) => {
    try {
      const res = await sendMessage(name, email, message);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
