import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addOrderAPI,
  handlePaymentCancelAPI,
  updatePaymentStatusOrderAPI,
} from "./orderAPI";
import { data } from "react-router-dom";

const addOrder = createAsyncThunk("order/add", async (data) => {
  try {
    const data = await addOrderAPI(data);
    toast.success(data.message);
    return data;
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

const updatePaymentStatusOrder = createAsyncThunk(
  "order/update-payment-status",
  async ({ order_id }) => {
    try {
      const data = await updatePaymentStatusOrderAPI({ order_id });
      return data;
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

const handlePaymentCancel = createAsyncThunk(
  "order/refund",
  async ({ order_id }) => {
    try {
      const data = await handlePaymentCancelAPI({ order_id });
      return data;
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

export { addOrder, updatePaymentStatusOrder, handlePaymentCancel };
