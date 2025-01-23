import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToCartAPI,
  deleteAllProductToCartAPI,
  deleteProductToCartAPI,
  getProductsAPI,
  updateProductToCartAPI,
} from "./cartAPI";
import { toast } from "react-toastify";

const addProductToCart = createAsyncThunk(
  "cart/add",
  async ({ product_id, size, quantity, stockQuantity }) => {
    try {
      const dataAddProduct = await addProductToCartAPI({
        product_id,
        size,
        quantity,
        stockQuantity,
      });
      const dataCart = await getProductsAPI();
      toast.success(dataAddProduct.message);
      return { dataAddProduct, dataCart };
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

const deleteProductToCart = createAsyncThunk("cart/delete", async ({ id }) => {
  try {
    const dataDeleteProduct = await deleteProductToCartAPI({ id });
    toast.success(dataDeleteProduct.message);
    const dataCart = await getProductsAPI();
    return { dataDeleteProduct, dataCart };
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const deleteAllProductToCart = createAsyncThunk("cart/delete-all", async () => {
  try {
    const dataDeleteAllProduct = await deleteAllProductToCartAPI();
    const dataCart = await getProductsAPI();
    return { dataDeleteAllProduct, dataCart };
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const updateProductToCart = createAsyncThunk(
  "cart/update",
  async ({ id, quantity }) => {
    try {
      const dataUpdateProduct = await updateProductToCartAPI({ id, quantity });
      toast.success(dataUpdateProduct.message);
      const dataCart = await getProductsAPI();
      return { dataUpdateProduct, dataCart };
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

const getProducts = createAsyncThunk("cart/list", async () => {
  try {
    const data = await getProductsAPI();
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

export {
  addProductToCart,
  getProducts,
  deleteProductToCart,
  deleteAllProductToCart,
  updateProductToCart,
};
