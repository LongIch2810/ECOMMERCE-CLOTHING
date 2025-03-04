import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  getFilterProducts,
  getMaxPrice,
  getMenProducts,
  getMinPrice,
  getProductDetail,
  getWomenProducts,
} from "./productThunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    loadingDetail: false,
    products: [],
    menProducts: [],
    womenProducts: [],
    relatedProducts: [],
    productInfo: null,
    current_page: 1,
    total_products: 0,
    total_pages: 1,
    min_price: null,
    max_price: null,
    message: null,
    isSuccess: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilterProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilterProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.results?.products;
        state.total_products = action.payload?.results?.total_products;
        state.total_pages = action.payload?.results?.total_pages;
        state.current_page = action.payload?.results?.current_page;
      })
      .addCase(getFilterProducts.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(getMenProducts.fulfilled, (state, action) => {
        state.menProducts = action.payload?.results?.products;
      })
      .addCase(getWomenProducts.fulfilled, (state, action) => {
        state.womenProducts = action.payload?.results?.products;
      })
      .addCase(getMaxPrice.fulfilled, (state, action) => {
        state.max_price = action.payload?.max_price;
      })
      .addCase(getMinPrice.fulfilled, (state, action) => {
        state.min_price = action.payload?.min_price;
      })
      .addCase(getProductDetail.pending, (state, action) => {
        state.loadingDetail = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.productInfo = action.payload?.data?.result;
        state.relatedProducts =
          action.payload?.dataRelatedProducts?.results?.products;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.message = action.payload?.message;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.products = action.payload?.dataProducts.results?.products;
        state.total_products =
          action.payload?.dataProducts.results?.total_products;
        state.total_pages = action.payload?.dataProducts.results?.total_pages;
        state.current_page = action.payload?.dataProducts.results?.current_page;
        state.message = action.payload?.dataAddProduct.message;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setMenProducts, setWomenProducts, setCurrentPage } =
  productSlice.actions;
export default productSlice.reducer;
