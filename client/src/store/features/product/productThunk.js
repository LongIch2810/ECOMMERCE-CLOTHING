import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMenProductsAPI,
  getProductDetailAPI,
  getProductsAPI,
  getWomenProductsAPI,
} from "./productAPI";

const getProducts = createAsyncThunk(
  "product/list",
  async ({ page = 1, limit = 10 }) => {
    try {
      const data = await getProductsAPI({ page, limit });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return error.response.data;
      }
      console.log(error);
      return error;
    }
  }
);

const getMenProducts = createAsyncThunk("product/men", async () => {
  try {
    const data = await getMenProductsAPI();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      return error.response.data;
    }
    console.log(error);
    return error;
  }
});

const getWomenProducts = createAsyncThunk("product/women", async () => {
  try {
    const data = await getWomenProductsAPI();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      return error.response.data;
    }
    console.log(error);
    return error;
  }
});

const getProductDetail = createAsyncThunk("product/detail", async ({ id }) => {
  try {
    const data = await getProductDetailAPI({ id });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      return error.response.data;
    }
    console.log(error);
    return error;
  }
});

export { getProducts, getMenProducts, getWomenProducts, getProductDetail };
