import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productThunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    current_page: 1,
    total_products: 0,
    total_pages: 1,
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
        state.products = action.payload?.results?.products;
        state.total_products = action.payload?.results?.total_products;
        state.total_pages = action.payload?.results?.total_pages;
        state.current_page = action.payload?.results?.current_page;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export default productSlice.reducer;
