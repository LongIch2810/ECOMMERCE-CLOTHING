import { createSlice } from "@reduxjs/toolkit";
import { handlePaymentCancel, updatePaymentStatusOrder } from "./orderThunk";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    paymentStatus: false,
    isCancel: false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePaymentStatusOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePaymentStatusOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(updatePaymentStatusOrder.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = false;
        state.message = action.payload?.message;
      })
      .addCase(handlePaymentCancel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handlePaymentCancel.fulfilled, (state, action) => {
        state.loading = false;
        state.isCancel = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(handlePaymentCancel.rejected, (state, action) => {
        state.loading = false;
        state.isCancel = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setShipping, setAddress, setVoucher } = orderSlice.actions;
export default orderSlice.reducer;
