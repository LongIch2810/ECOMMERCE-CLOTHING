import { createSlice } from "@reduxjs/toolkit";
import {
  addVoucher,
  deleteVoucher,
  editVoucher,
  getFilterVouchers,
  getVoucherById,
  getVouchers,
} from "./voucherThunk";
import { saveVoucher } from "../user/userThunk";

const voucherSlice = createSlice({
  name: "shipping",
  initialState: {
    loading: false,
    vouchers: [],
    filterVouchers: [],
    total_vouchers: null,
    current_page: 1,
    isAddVoucher: false,
    isSuccess: false,
    voucherById: null,
    message: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setVoucherById: (state, action) => {
      state.voucherById = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVouchers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getVouchers.fulfilled, (state, action) => {
        state.loading = false;
        state.vouchers = action.payload?.vouchers;
      })
      .addCase(getVouchers.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(getFilterVouchers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilterVouchers.fulfilled, (state, action) => {
        state.loading = false;
        state.filterVouchers = action.payload?.results.vouchers;
        state.total_vouchers = action.payload?.results.total_vouchers;
        state.current_page = action.payload?.results.current_page;
      })
      .addCase(getFilterVouchers.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(saveVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.vouchers = action.payload?.dataVouchers?.vouchers;
      })
      .addCase(addVoucher.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.isAddVoucher = action.payload?.success;
      })
      .addCase(addVoucher.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(editVoucher.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(editVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.filterVouchers = action.payload?.dataVouchers.results.vouchers;
        state.current_page = action.payload?.dataVouchers.results.current_page;
        state.total_vouchers =
          action.payload?.dataVouchers.results.total_vouchers;
        state.message = action.payload?.dataEditVoucher.message;
      })
      .addCase(editVoucher.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isSuccess = false;
      })
      .addCase(deleteVoucher.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.filterVouchers = action.payload?.dataVouchers.results.vouchers;
        state.current_page = action.payload?.dataVouchers.results.current_page;
        state.total_vouchers =
          action.payload?.dataVouchers.results.total_vouchers;
        state.message = action.payload?.dataDeleteVoucher.message;
      })
      .addCase(deleteVoucher.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isSuccess = false;
      })
      .addCase(getVoucherById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getVoucherById.fulfilled, (state, action) => {
        state.loading = false;
        state.voucherById = action.payload?.voucher;
      })
      .addCase(getVoucherById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setCurrentPage, setIsSuccess, setVoucherById } =
  voucherSlice.actions;
export default voucherSlice.reducer;
