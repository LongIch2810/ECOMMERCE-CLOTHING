import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTypeProductAPI,
  deleteTypeProductAPI,
  editTypeProductAPI,
  getFilterTypeProductsAPI,
  getTypeProductByIdAPI,
  getTypeProductsAPI,
  getTypeProductsByCategoryAPI,
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

const editTypeProduct = createAsyncThunk(
  "typeProduct/edit-type-product",
  async (data) => {
    try {
      const dataEditTypeProduct = await editTypeProductAPI(data);
      const dataTypeProducts = await getFilterTypeProductsAPI();
      toast.success(dataEditTypeProduct.message);
      return { dataEditTypeProduct, dataTypeProducts };
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

const deleteTypeProduct = createAsyncThunk(
  "typeProduct/delete-type-product",
  async (typeProductId) => {
    try {
      const dataDeleteTypeProduct = await deleteTypeProductAPI(typeProductId);
      const dataTypeProducts = await getFilterTypeProductsAPI();
      toast.success(dataDeleteTypeProduct.message);
      return { dataDeleteTypeProduct, dataTypeProducts };
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

const getTypeProductById = createAsyncThunk(
  "typeProduct/get-type-product-id",
  async (typeProductId) => {
    try {
      const data = await getTypeProductByIdAPI(typeProductId);
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

const getTypeProductsByCategory = createAsyncThunk(
  "typeProduct/get-typeProducts-by-category",
  async (category_id) => {
    try {
      const data = await getTypeProductsByCategoryAPI(category_id);
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
  getTypeProducts,
  getFilterTypeProducts,
  addTypeProduct,
  editTypeProduct,
  deleteTypeProduct,
  getTypeProductById,
  getTypeProductsByCategory,
};
