import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductAPI,
  getFilterProductsAPI,
  getMaxPriceAPI,
  getMenProductsAPI,
  getMinPriceAPI,
  getProductDetailAPI,
  getProductsAPI,
  getRelatedProductsAPI,
  getWomenProductsAPI,
} from "./productAPI";
import { getReviewsAPI } from "../review/reviewAPI";
import { toast } from "react-toastify";

const getProducts = createAsyncThunk(
  "product/list",
  async ({ page = 1, limit = 10 }) => {
    try {
      const data = await getProductsAPI({ page, limit });
      return data;
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

const getFilterProducts = createAsyncThunk("product/filter", async (data) => {
  try {
    const result = await getFilterProductsAPI(data);
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

const getMenProducts = createAsyncThunk("product/men", async () => {
  try {
    const data = await getMenProductsAPI();
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

const getWomenProducts = createAsyncThunk("product/women", async () => {
  try {
    const data = await getWomenProductsAPI();
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

const getProductDetail = createAsyncThunk("product/detail", async ({ id }) => {
  try {
    const data = await getProductDetailAPI({ id });
    const dataReview = await getReviewsAPI({ product_id: id });
    const dataRelatedProducts = await getRelatedProductsAPI({ id });
    return { data, dataReview, dataRelatedProducts };
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const getMaxPrice = createAsyncThunk("product/max-price", async () => {
  try {
    const data = await getMaxPriceAPI();
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

const getMinPrice = createAsyncThunk("product/min-price", async () => {
  try {
    const data = await getMinPriceAPI();
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

const addProduct = createAsyncThunk("product/add-product", async (data) => {
  try {
    const dataAddProduct = await addProductAPI(data);
    const dataProducts = await getFilterProductsAPI({ page: 1, limit: 5 });
    toast.success(dataAddProduct.message);
    return { dataAddProduct, dataProducts };
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

export {
  getProducts,
  getFilterProducts,
  getMenProducts,
  getWomenProducts,
  getProductDetail,
  getMaxPrice,
  getMinPrice,
  addProduct,
};
