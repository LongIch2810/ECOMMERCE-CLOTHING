import { createSlice } from "@reduxjs/toolkit";
import {
  addTypeProduct,
  getFilterTypeProducts,
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
    message: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
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
      });
  },
});

export const { setCurrentPage } = typeProductSlice.actions;
export default typeProductSlice.reducer;
