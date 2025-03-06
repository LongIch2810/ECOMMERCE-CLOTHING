import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addSupplierAPI,
  deleteSupplierAPI,
  editSupplierAPI,
  getFilterSuppliersAPI,
  getSupplierByIdAPI,
  getSuppliersAPI,
} from "./supplierAPI";
import { toast } from "react-toastify";

const getSuppliers = createAsyncThunk("supplier/list", async () => {
  try {
    const result = await getSuppliersAPI();
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

const getFilterSuppliers = createAsyncThunk("supplier/filter", async (data) => {
  try {
    const result = await getFilterSuppliersAPI(data);
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
    const dataSuppliers = await getFilterSuppliersAPI();
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

const editSupplier = createAsyncThunk(
  "supplier/edit-supplier",
  async (data) => {
    try {
      const dataEditSupplier = await editSupplierAPI(data);
      const dataSuppliers = await getFilterSuppliersAPI();
      toast.success(dataEditSupplier.message);
      return { dataEditSupplier, dataSuppliers };
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

const deleteSupplier = createAsyncThunk(
  "supplier/delete-supplier",
  async (supplierId) => {
    try {
      const dataDeleteSupplier = await deleteSupplierAPI(supplierId);
      const dataSuppliers = await getFilterSuppliersAPI();
      toast.success(dataDeleteSupplier.message);
      return { dataDeleteSupplier, dataSuppliers };
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

const getSupplierById = createAsyncThunk(
  "supplier/get-supplier-id",
  async (supplierId) => {
    try {
      const data = await getSupplierByIdAPI(supplierId);
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

export {
  getSuppliers,
  addSupplier,
  getFilterSuppliers,
  editSupplier,
  deleteSupplier,
  getSupplierById,
};
