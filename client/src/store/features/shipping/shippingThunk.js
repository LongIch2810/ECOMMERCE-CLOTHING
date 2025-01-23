import { createAsyncThunk } from "@reduxjs/toolkit";
import { getShippingAPI } from "./shippingAPI";

const getShipping = createAsyncThunk("shipping/list", async () => {
  try {
    const data = await getShippingAPI();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export { getShipping };
