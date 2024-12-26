import { createSlice } from "@reduxjs/toolkit";
import { addProductToCart, getProducts } from "./cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    products: [],
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload?.cart;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message;
      })
      .addCase(addProductToCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message;
      });
  },
});

export default cartSlice.reducer;
