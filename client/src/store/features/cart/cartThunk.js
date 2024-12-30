import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToCartAPI,
  deleteProductToCartAPI,
  getProductsAPI,
  updateProductToCartAPI,
} from "./cartAPI";
import { toast } from "react-toastify";

const addProductToCart = createAsyncThunk(
  "cart/add",
  async ({ product_id, size, quantity }) => {
    try {
      const dataAddProduct = await addProductToCartAPI({
        product_id,
        size,
        quantity,
      });
      const dataCart = await getProductsAPI();
      toast.success(dataAddProduct.message);
      return { dataAddProduct, dataCart };
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return error.response.data;
      }
      console.log(error);
      return error;
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
      return error.response.data;
    }
    console.log(error);
    return error;
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
        return error.response.data;
      }
      console.log(error);
      return error;
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
      return error.response.data;
    }
    console.log(error);
    return error;
  }
});

export {
  addProductToCart,
  getProducts,
  deleteProductToCart,
  updateProductToCart,
};
