import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addVoucherAPI,
  deleteVoucherAPI,
  editVoucherAPI,
  getFilterVouchersAPI,
  getVoucherByIdAPI,
  getVouchersAPI,
} from "./voucherAPI";
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

const getFilterVouchers = createAsyncThunk("voucher/filter", async (data) => {
  try {
    const result = await getFilterVouchersAPI(data);
    return result;
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

const editVoucher = createAsyncThunk("voucher/edit-voucher", async (data) => {
  try {
    const dataEditVoucher = await editVoucherAPI(data);
    const dataVouchers = await getFilterVouchersAPI();
    toast.success(dataEditVoucher.message);
    return { dataEditVoucher, dataVouchers };
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

const deleteVoucher = createAsyncThunk(
  "voucher/delete-voucher",
  async (voucherId) => {
    try {
      const dataDeleteVoucher = await deleteVoucherAPI(voucherId);
      const dataVouchers = await getFilterVouchersAPI();
      toast.success(dataDeleteVoucher.message);
      return { dataDeleteVoucher, dataVouchers };
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const getVoucherById = createAsyncThunk(
  "voucher/get-voucher-id",
  async (voucherId) => {
    try {
      const data = await getVoucherByIdAPI(voucherId);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

export {
  getVouchers,
  addVoucher,
  getFilterVouchers,
  editVoucher,
  deleteVoucher,
  getVoucherById,
};
