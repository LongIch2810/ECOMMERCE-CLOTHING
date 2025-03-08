import { createSlice } from "@reduxjs/toolkit";
import {
  addOrder,
  getOrders,
  getOrdersByUserId,
  cancelOrder,
  changeStatusSuccessfully,
  changeStatus,
  exportExcel,
  fetchOrderDetail,
} from "./orderThunk";
import { getVoucher } from "../user/userThunk";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    addOrderSuccess: false,
    orders: null,
    total_orders: null,
    current_page: 1,
    message: null,
    voucher: null,
    total_price: null,
    shippingMethod: null,
    isExportExcel: false,
    orderDetail: null,
  },
  reducers: {
    setAddOrderSuccess: (state, action) => {
      console.log(action.payload);
      state.addOrderSuccess = action.payload;
    },
    setVoucher: (state, action) => {
      state.voucher = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.total_price = action.payload;
    },
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
    setIsExportExcel: (state, action) => {
      state.isExportExcel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state, action) => {
        state.loading = true;
        state.addOrder = false;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.addOrderSuccess = true;
        state.orders = action.payload?.dataOrders?.orders;
        state.message = action.payload?.dataAddOrder?.message;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.addOrderSuccess = false;
      })
      .addCase(getVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.voucher = action.payload?.voucher;
      })
      .addCase(getOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.orders;
      })
      .addCase(getOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.results.orders;
        state.total_orders = action.payload?.results.total_orders;
        state.current_page = action.payload?.results.current_page;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.dataOrders.results.orders;
        state.current_page = action.payload?.dataOrders.results.current_page;
        state.total_orders = action.payload?.dataOrders.results.total_orders;
        state.message = action.payload?.dataChangeStatus.message;
      })
      .addCase(changeStatusSuccessfully.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.dataOrdersByUserId.orders;
        state.message = action.payload?.dataChangeStatus.message;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.dataOrdersByUserId.orders;
        state.message = action.payload?.dataCancelOrder.message;
      })
      .addCase(exportExcel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(exportExcel.fulfilled, (state, action) => {
        state.loading = false;
        state.isExportExcel = true;
      })
      .addCase(exportExcel.rejected, (state, action) => {
        state.loading = false;
        state.isExportExcel = false;
      })
      .addCase(fetchOrderDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetail = action.payload?.order;
      })
      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const {
  setVoucher,
  setAddOrderSuccess,
  setCurrentPage,
  setTotalPrice,
  setShippingMethod,
  setIsExportExcel,
} = orderSlice.actions;
export default orderSlice.reducer;
