import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsAPI } from "./productAPI";

const getProducts = createAsyncThunk(
  "product/list",
  async ({ slug, page = 1, limit = 10 }) => {
    try {
      const data = await getProductsAPI({ slug, page, limit });
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

export { getProducts };
