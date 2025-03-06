import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getFilterProducts,
  getMaxPrice,
  getMenProducts,
  getMinPrice,
  getProductById,
  getProductDetail,
  getProducts,
  getWomenProducts,
} from "./productThunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    loadingDetail: false,
    products: [],
    filterProducts: [],
    menProducts: [],
    womenProducts: [],
    relatedProducts: [],
    productInfo: null,
    productById: null,
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
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setProductById: (state, action) => {
      state.productById = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilterProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilterProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filterProducts = action.payload?.results?.products;
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
        state.isSuccess = false;
        state.message = action.payload?.message;
      })
      .addCase(editProduct.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.products = action.payload?.dataProducts.results?.products;
        state.total_products =
          action.payload?.dataProducts.results?.total_products;
        state.total_pages = action.payload?.dataProducts.results?.total_pages;
        state.current_page = action.payload?.dataProducts.results?.current_page;
        state.message = action.payload?.dataEditProduct.message;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = action.payload?.message;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.products = action.payload?.dataProducts.results?.products;
        state.total_products =
          action.payload?.dataProducts.results?.total_products;
        state.total_pages = action.payload?.dataProducts.results?.total_pages;
        state.current_page = action.payload?.dataProducts.results?.current_page;
        state.message = action.payload?.dataDeleteProduct.message;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = action.payload?.message;
      })
      .addCase(getProductById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productById = action.payload?.product;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
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

export const { setCurrentPage, setIsSuccess, setProductById } =
  productSlice.actions;
export default productSlice.reducer;
