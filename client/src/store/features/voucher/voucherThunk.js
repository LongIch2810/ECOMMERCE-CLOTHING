import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVouchersAPI } from "./voucherAPI";

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

export { getVouchers };
