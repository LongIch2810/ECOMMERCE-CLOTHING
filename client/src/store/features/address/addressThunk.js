import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAddressAPI,
  getAddressDefaultAPI,
  getAddressesAPI,
  getAddressesByUserIdAPI,
  setAddressDefaultAPI,
} from "./addressAPI";
import { toast } from "react-toastify";

const addAddress = createAsyncThunk("address/add", async (data) => {
  try {
    const dataAddAddress = await addAddressAPI(data);
    const dataAddresses = await getAddressesByUserIdAPI();
    const dataAddressDefault = await getAddressDefaultAPI();
    toast.success(dataAddAddress.message);
    return { dataAddAddress, dataAddresses, dataAddressDefault };
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const getAddressesByUserId = createAsyncThunk("address/list", async () => {
  try {
    const dataAddresses = await getAddressesByUserIdAPI();
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

const getAddresses = createAsyncThunk("address/get-all", async (data) => {
  try {
    const result = await getAddressesAPI(data);
    return result;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const setAddressDefault = createAsyncThunk(
  "address/set-default",
  async (address_id) => {
    try {
      const dataSetDefault = await setAddressDefaultAPI(address_id);
      const dataAddresses = await getAddressesByUserIdAPI();
      const dataAddressDefault = await getAddressDefaultAPI();
      toast.success(dataSetDefault.message);
      return { dataSetDefault, dataAddresses, dataAddressDefault };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

export { getAddressesByUserId, addAddress, getAddresses, setAddressDefault };
