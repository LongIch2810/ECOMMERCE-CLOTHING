import { createSlice } from "@reduxjs/toolkit";
import { addBrand, getBrands, getFilterBrands } from "./brandThunk";

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    loading: false,
    brands: [],
    filterBrands: [],
    total_brands: null,
    current_page: 1,
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
      .addCase(getBrands.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload?.brands;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(getFilterBrands.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilterBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.filterBrands = action.payload?.results.brands;
        state.total_brands = action.payload?.results.total_brands;
        state.current_page = action.payload?.results.current_page;
      })
      .addCase(getFilterBrands.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(addBrand.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload?.dataAddBrand.success;
        state.filterBrands = action.payload?.dataBrands.results.brands;
        state.total_brands = action.payload?.dataBrands.results.total_brands;
        state.current_page = action.payload?.dataBrands.results.current_page;
        state.message = action.payload?.dataAddBrand.message;
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setCurrentPage } = brandSlice.actions;
export default brandSlice.reducer;
