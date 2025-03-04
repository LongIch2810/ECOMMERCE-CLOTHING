import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { getColorsAPI, getFilterColorsAPI } from "./colorAPI";

const getColors = createAsyncThunk("color/list", async () => {
  try {
    const data = await getColorsAPI();
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

const getFilterColors = createAsyncThunk("color/filter", async (data) => {
  try {
    const result = await getFilterColorsAPI(data);
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

export { getColors, getFilterColors };
