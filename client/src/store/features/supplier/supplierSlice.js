import { createSlice } from "@reduxjs/toolkit";
import {
  addSupplier,
  deleteSupplier,
  editSupplier,
  getFilterSuppliers,
  getSupplierById,
  getSuppliers,
} from "./supplierThunk";

const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    loading: false,
    suppliers: [],
    supplierById: null,
    filterSuppliers: [],
    message: null,
    total_suppliers: null,
    current_page: 1,
    isSuccess: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setSupplierById: (state, action) => {
      state.supplierById = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload?.suppliers;
      })
      .addCase(getFilterSuppliers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilterSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.filterSuppliers = action.payload?.results.suppliers;
        state.current_page = action.payload?.results.current_page;
        state.total_suppliers = action.payload?.results.total_suppliers;
      })
      .addCase(getFilterSuppliers.rejected, (state, action) => {
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
        state.filterSuppliers = action.payload?.dataSuppliers.results.suppliers;
        state.current_page = action.payload?.dataSuppliers.results.current_page;
        state.total_suppliers =
          action.payload?.dataSuppliers.results.total_suppliers;
        state.message = action.payload?.dataAddSupplier.message;
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = action.payload?.message;
      })
      .addCase(editSupplier.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(editSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.filterSuppliers = action.payload?.dataSuppliers.results.suppliers;
        state.current_page = action.payload?.dataSuppliers.results.current_page;
        state.total_suppliers =
          action.payload?.dataSuppliers.results.total_suppliers;
        state.message = action.payload?.dataEditSupplier.message;
      })
      .addCase(editSupplier.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isSuccess = false;
      })
      .addCase(deleteSupplier.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.filterSuppliers = action.payload?.dataSuppliers.results.suppliers;
        state.current_page = action.payload?.dataSuppliers.results.current_page;
        state.total_suppliers =
          action.payload?.dataSuppliers.results.total_suppliers;
        state.message = action.payload?.dataDeleteSupplier.message;
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isSuccess = false;
      })
      .addCase(getSupplierById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSupplierById.fulfilled, (state, action) => {
        state.loading = false;
        state.supplierById = action.payload?.supplier;
      })
      .addCase(getSupplierById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setCurrentPage, setIsSuccess, setSupplierById } =
  supplierSlice.actions;
export default supplierSlice.reducer;
