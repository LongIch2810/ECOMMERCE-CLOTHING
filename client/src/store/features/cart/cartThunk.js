import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductToCartAPI, getProductsAPI } from "./cartAPI";
import { toast } from "react-toastify";

const addProductToCart = createAsyncThunk(
  "cart/add",
  async ({ product_id, size, quantity }) => {
    try {
      const data = await addProductToCartAPI({ product_id, size, quantity });
      toast.success(data.message);
      return data;
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

export { addProductToCart, getProducts };
