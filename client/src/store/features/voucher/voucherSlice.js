import { createSlice } from "@reduxjs/toolkit";
import { addVoucher, getVouchers } from "./voucherThunk";
import { saveVoucher } from "../user/userThunk";

const voucherSlice = createSlice({
  name: "shipping",
  initialState: {
    loading: false,
    vouchers: null,
    isAddVoucher: false,
    message: null,
  },
  reducers: {},
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
      });
  },
});

export default voucherSlice.reducer;
