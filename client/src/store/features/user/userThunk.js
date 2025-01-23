import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserInfoAPI, getVoucherAPI, saveVoucherAPI } from "./userAPI";
import { getVouchersAPI } from "../voucher/voucherAPI";

const getUserInfo = createAsyncThunk("user/info", async () => {
  try {
    const data = await getUserInfoAPI();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const saveVoucher = createAsyncThunk(
  "user/save-voucher",
  async ({ voucher_id }) => {
    try {
      const data = await saveVoucherAPI({ voucher_id });
      const dataUserInfo = await getUserInfoAPI();
      const dataVouchers = await getVouchersAPI();
      toast.success(data?.message);
      return { data, dataUserInfo, dataVouchers };
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const getVoucher = createAsyncThunk(
  "user/voucher-info",
  async ({ voucher_id }) => {
    console.log(voucher_id);
    try {
      const data = await getVoucherAPI({ voucher_id });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);
export { getUserInfo, saveVoucher, getVoucher };
