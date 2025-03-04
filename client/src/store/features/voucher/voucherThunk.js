import { createAsyncThunk } from "@reduxjs/toolkit";
import { addVoucherAPI, getVouchersAPI } from "./voucherAPI";
import { toast } from "react-toastify";

const getVouchers = createAsyncThunk("voucher/list", async () => {
  try {
    const data = await getVouchersAPI();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const addVoucher = createAsyncThunk("voucher/add-voucher", async (data) => {
  try {
    const dataAddVoucher = await addVoucherAPI(data);
    toast.success(dataAddVoucher.message);
    return dataAddVoucher;
  } catch (error) {
    const errorData = error.response.data.message;
    if (error.response && error.response.data.message) {
      if (Array.isArray(errorData)) {
        errorData.forEach((err) => {
          toast.error(err.msg); // Hiển thị từng lỗi
        });
      } else {
        toast.error(errorData); // Hiển thị lỗi dạng chuỗi
      }
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export { getVouchers, addVoucher };
