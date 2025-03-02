import { createSlice } from "@reduxjs/toolkit";
import { addSupplier, getSuppliers } from "./supplierThunk";

const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    loading: false,
    suppliers: [],
    message: null,
    total_suppliers: null,
    current_page: 1,
    isSuccess: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload?.results.suppliers;
        state.current_page = action.payload?.results.current_page;
        state.total_suppliers = action.payload?.results.total_suppliers;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(addSupplier.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload?.dataAddSupplier.success;
        state.suppliers = action.payload?.dataSuppliers.results.suppliers;
        state.current_page = action.payload?.dataSuppliers.results.current_page;
        state.total_suppliers =
          action.payload?.dataSuppliers.results.total_suppliers;
        state.message = action.payload?.dataAddSupplier.message;
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setCurrentPage } = supplierSlice.actions;
export default supplierSlice.reducer;
