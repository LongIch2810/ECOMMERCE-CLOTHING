import { createSlice } from "@reduxjs/toolkit";
import {
  addTypeProduct,
  deleteTypeProduct,
  editTypeProduct,
  getFilterTypeProducts,
  getTypeProductById,
  getTypeProducts,
} from "./typeProductThunk";

const typeProductSlice = createSlice({
  name: "typeProduct",
  initialState: {
    loading: false,
    typeProducts: [],
    filterTypeProducts: [],
    total_typeProducts: null,
    current_page: 1,
    isSuccess: false,
    typeProductById: null,
    message: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
    setTypeProductById: (state, action) => {
      state.typeProductById = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTypeProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTypeProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.typeProducts = action.payload?.typeProducts;
      })
      .addCase(getTypeProducts.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(getFilterTypeProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilterTypeProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filterTypeProducts = action.payload?.results.typeProducts;
        state.total_typeProducts = action.payload?.results.total_typeProducts;
        state.current_page = action.payload?.results.current_page;
      })
      .addCase(getFilterTypeProducts.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(addTypeProduct.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(addTypeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.typeProducts =
          action.payload?.dataTypeProducts.results.typeProducts;
        state.total_typeProducts =
          action.payload?.dataTypeProducts.results.total_typeProducts;
        state.current_page =
          action.payload?.dataTypeProducts.results.current_page;
        state.message = action.payload?.dataAddTypeProduct.message;
        state.isSuccess = action.payload?.dataAddTypeProduct.success;
      })
      .addCase(addTypeProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isSuccess = false;
      })
      .addCase(editTypeProduct.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(editTypeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.typeProducts =
          action.payload?.dataTypeProducts.results.typeProducts;
        state.total_typeProducts =
          action.payload?.dataTypeProducts.results.total_typeProducts;
        state.current_page =
          action.payload?.dataTypeProducts.results.current_page;
        state.message = action.payload?.dataEditTypeProduct.message;
        state.isSuccess = true;
      })
      .addCase(editTypeProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isSuccess = false;
      })
      .addCase(deleteTypeProduct.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(deleteTypeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.typeProducts =
          action.payload?.dataTypeProducts.results.typeProducts;
        state.total_typeProducts =
          action.payload?.dataTypeProducts.results.total_typeProducts;
        state.current_page =
          action.payload?.dataTypeProducts.results.current_page;
        state.message = action.payload?.dataDeleteTypeProduct.message;
        state.isSuccess = true;
      })
      .addCase(deleteTypeProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isSuccess = false;
      })
      .addCase(getTypeProductById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTypeProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.typeProductById = action.payload?.typeProduct;
      })
      .addCase(getTypeProductById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setCurrentPage, setIsSuccess, setTypeProductById } =
  typeProductSlice.actions;
export default typeProductSlice.reducer;
