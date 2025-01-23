import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAddressAPI,
  getAddressDefaultAPI,
  getAddressesAPI,
} from "./addressAPI";
import { toast } from "react-toastify";

const addAddress = createAsyncThunk("address/add", async (data) => {
  try {
    const dataAddAddress = await addAddressAPI(data);
    const dataAddresses = await getAddressesAPI();
    toast.success(dataAddAddress.message);
    return { dataAddAddress, dataAddresses };
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const getAddresses = createAsyncThunk("address/list", async () => {
  try {
    const dataAddresses = await getAddressesAPI();
    const dataAddressDefault = await getAddressDefaultAPI();
    return { dataAddressDefault, dataAddresses };
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export { getAddresses, addAddress };
