import { createSlice } from "@reduxjs/toolkit";
import { getShipping } from "./shippingThunk";

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    loading: false,
    shipping: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShipping.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getShipping.fulfilled, (state, action) => {
        state.loading = false;
        state.shipping = action.payload?.shipping;
      })
      .addCase(getShipping.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export default shippingSlice.reducer;
