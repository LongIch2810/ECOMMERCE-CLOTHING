import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
  addColorAPI,
  deleteColorAPI,
  editColorAPI,
  getColorByIdAPI,
  getColorsAPI,
  getFilterColorsAPI,
} from "./colorAPI";

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

const addColor = createAsyncThunk("color/add-color", async (data) => {
  try {
    const result = await addColorAPI(data);
    toast.success(result.message);
    return result;
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

const editColor = createAsyncThunk("color/edit-color", async (data) => {
  try {
    const dataEditColor = await editColorAPI(data);
    const dataColors = await getFilterColorsAPI();
    toast.success(dataEditColor.message);
    return { dataEditColor, dataColors };
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

const deleteColor = createAsyncThunk("color/delete-color", async (colorId) => {
  try {
    const dataDeleteColor = await deleteColorAPI(colorId);
    const dataColors = await getFilterColorsAPI();
    toast.success(dataDeleteColor.message);
    return { dataDeleteColor, dataColors };
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

const getColorById = createAsyncThunk("color/get-color-id", async (colorId) => {
  try {
    const data = await getColorByIdAPI(colorId);
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
});

export {
  getColors,
  getFilterColors,
  addColor,
  editColor,
  deleteColor,
  getColorById,
};
