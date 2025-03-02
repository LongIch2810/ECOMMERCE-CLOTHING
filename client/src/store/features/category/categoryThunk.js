import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesAPI } from "./categoryAPI";

const getCategories = createAsyncThunk("category/list", async () => {
  try {
    const data = await getCategoriesAPI();
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

export { getCategories };
