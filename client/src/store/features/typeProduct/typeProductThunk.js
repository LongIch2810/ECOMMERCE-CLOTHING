import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTypeProductAPI,
  getFilterTypeProductsAPI,
  getTypeProductsAPI,
} from "./typeProductAPI";
import { toast } from "react-toastify";

const getTypeProducts = createAsyncThunk("typeProduct/list", async () => {
  try {
    const data = await getTypeProductsAPI();
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

const getFilterTypeProducts = createAsyncThunk(
  "typeProduct/filter",
  async (data) => {
    try {
      const result = await getFilterTypeProductsAPI(data);
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const addTypeProduct = createAsyncThunk(
  "typeProduct/add-type-product",
  async (data) => {
    try {
      const dataAddTypeProduct = await addTypeProductAPI(data);
      const dataTypeProducts = await getFilterTypeProductsAPI();
      toast.success(dataAddTypeProduct.message);
      return { dataAddTypeProduct, dataTypeProducts };
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
export { getTypeProducts, getFilterTypeProducts, addTypeProduct };
