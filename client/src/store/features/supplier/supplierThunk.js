import { createAsyncThunk } from "@reduxjs/toolkit";
import { addSupplierAPI, getSuppliersAPI } from "./supplierAPI";
import { toast } from "react-toastify";

const getSuppliers = createAsyncThunk("supplier/list", async (data) => {
  try {
    const result = await getSuppliersAPI(data);
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

const addSupplier = createAsyncThunk("supplier/add-supplier", async (data) => {
  try {
    const dataAddSupplier = await addSupplierAPI(data);
    const dataSuppliers = await getSuppliersAPI();
    toast.success(dataAddSupplier.message);
    return { dataSuppliers, dataAddSupplier };
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

export { getSuppliers, addSupplier };
