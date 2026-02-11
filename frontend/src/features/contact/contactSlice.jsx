import { createSlice } from "@reduxjs/toolkit";
import { sendContactMessage } from "./contactThunk";

const contactSlice = createSlice({
  name: "contact",
  initialState: { success: false, loading: false, error: null },
  reducers: {
    clearError: (state) => { state.error = null; },
    resetSuccess: (state) => { state.success = false; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(sendContactMessage.fulfilled, (state) => { state.loading = false; state.success = true; })
      .addCase(sendContactMessage.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearError, resetSuccess } = contactSlice.actions;
export default contactSlice.reducer;
