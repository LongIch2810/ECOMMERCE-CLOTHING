import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addOrderAPI,
  cancelOrderAPI,
  changeStatusAPI,
  exportExcelAPI,
  getOrdersAPI,
  getOrdersByUserIdAPI,
} from "./orderAPI";

const addOrder = createAsyncThunk("order/add", async (data) => {
  try {
    const dataAddOrder = await addOrderAPI(data);
    const dataOrders = await getOrdersByUserIdAPI();
    toast.success(dataAddOrder.message);
    return { dataAddOrder, dataOrders };
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const getOrdersByUserId = createAsyncThunk("order/list-by-userId", async () => {
  try {
    const data = await getOrdersByUserIdAPI();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const getOrders = createAsyncThunk("order/get-all", async (data) => {
  try {
    const result = await getOrdersAPI(data);
    return result;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const changeStatus = createAsyncThunk(
  "order/admin-change-status",
  async ({ order_id, status }) => {
    try {
      const dataChangeStatus = await changeStatusAPI({ order_id, status });
      const dataOrders = await getOrdersAPI();
      toast.success(dataChangeStatus.message);
      return { dataChangeStatus, dataOrders };
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const changeStatusSuccessfully = createAsyncThunk(
  "order/change-status-successfully",
  async ({ order_id, status }) => {
    try {
      const dataChangeStatus = await changeStatusAPI({ order_id, status });
      const dataOrdersByUserId = await getOrdersByUserIdAPI();
      toast.success(dataChangeStatus.message);
      return { dataChangeStatus, dataOrdersByUserId };
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const cancelOrder = createAsyncThunk("order/cancel", async ({ order_id }) => {
  try {
    const dataCancelOrder = await cancelOrderAPI({ order_id });
    const dataOrdersByUserId = await getOrdersByUserIdAPI();
    toast.success(dataCancelOrder.message);
    return { dataCancelOrder, dataOrdersByUserId };
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const exportExcel = createAsyncThunk("order/export-excel", async () => {
  try {
    const result = await exportExcelAPI();

    const url = window.URL.createObjectURL(result); //Tạo url tạm thời chứa dữ liệu excel
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.xlsx"; // Tên file tải về
    document.body.appendChild(a); //Thêm thẻ a vào trình duyệt
    a.click(); // tự động click để tải về
    document.body.removeChild(a); //Xáo thẻ a khỏi trình duyệt
    window.URL.revokeObjectURL(url); //Xóa url tạm thời khỏi bộ nhớ

    return true;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export {
  addOrder,
  getOrdersByUserId,
  getOrders,
  changeStatus,
  changeStatusSuccessfully,
  cancelOrder,
  exportExcel,
};
