import { createSlice } from "@reduxjs/toolkit";
import {
  getMenProducts,
  getProductDetail,
  getProducts,
  getWomenProducts,
} from "./productThunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    menProducts: [],
    womenProducts: [],
    relatedProducts: [],
    productInfo: null,
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
      })
      .addCase(getMenProducts.fulfilled, (state, action) => {
        state.menProducts = action.payload?.results?.products;
      })
      .addCase(getWomenProducts.fulfilled, (state, action) => {
        state.womenProducts = action.payload?.results?.products;
      })
      .addCase(getProductDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productInfo = action.payload?.data?.result;
        state.relatedProducts =
          action.payload?.dataRelatedProducts?.results?.products;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setMenProducts, setWomenProducts } = productSlice.actions;
export default productSlice.reducer;
