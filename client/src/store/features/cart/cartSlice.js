import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToCart,
  deleteAllProductToCart,
  deleteProductToCart,
  getProducts,
  updateProductToCart,
} from "./cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    products: [],
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.cart;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(addProductToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.dataCart?.cart;
        state.message = action.payload?.dataAddProduct?.message;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(deleteProductToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.dataCart?.cart;
        state.message = action.payload?.dataDeleteProduct?.message;
      })
      .addCase(deleteProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(updateProductToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.dataCart?.cart;
        state.message = action.payload?.dataUpdateProduct?.message;
      })
      .addCase(updateProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(deleteAllProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.dataCart?.cart;
        state.message = action.payload?.dataDeleteAllProduct?.message;
      });
  },
});

export default cartSlice.reducer;
