import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  statisticalInStockAPI,
  statisticalRevenueDateDetailAPI,
  statisticalRevenueMonthAPI,
  statisticalRevenueMonthDetailAPI,
  statisticalRevenueYearAPI,
  statisticalRevenueYearDetailAPI,
  statisticalStatusOrderDateAPI,
  statisticalStatusOrderMonthAPI,
  statisticalStatusOrderYearAPI,
} from "./statisticalAPI";

const statisticalStatusOrderYear = createAsyncThunk(
  "order/statistical-status-order-year",
  async (data) => {
    try {
      const result = await statisticalStatusOrderYearAPI(data);
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);
const statisticalStatusOrderMonth = createAsyncThunk(
  "order/statistical-status-order-month",
  async (data) => {
    try {
      const result = await statisticalStatusOrderMonthAPI(data);
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);
const statisticalStatusOrderDate = createAsyncThunk(
  "order/statistical-status-order-date",
  async (data) => {
    try {
      const result = await statisticalStatusOrderDateAPI(data);
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const statisticalRevenueYear = createAsyncThunk(
  "order/statistical-revenue-year",
  async (data) => {
    try {
      const result = await statisticalRevenueYearAPI(data);
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const statisticalRevenueMonth = createAsyncThunk(
  "order/statistical-revenue-month",
  async (data) => {
    try {
      const result = await statisticalRevenueMonthAPI(data);
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const statisticalInStock = createAsyncThunk(
  "stock/statistical-in-stock",
  async (data) => {
    try {
      const result = await statisticalInStockAPI(data);
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const statisticalRevenueDateDetail = createAsyncThunk(
  "stock/statistical-revenue-date-detail",
  async (data) => {
    try {
      const result = await statisticalRevenueDateDetailAPI(data);
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const statisticalRevenueMonthDetail = createAsyncThunk(
  "stock/statistical-revenue-month-detail",
  async (data) => {
    try {
      const result = await statisticalRevenueMonthDetailAPI(data);
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const statisticalRevenueYearDetail = createAsyncThunk(
  "stock/statistical-revenue-year-detail",
  async (data) => {
    try {
      const result = await statisticalRevenueYearDetailAPI(data);
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

export {
  statisticalStatusOrderYear,
  statisticalStatusOrderDate,
  statisticalStatusOrderMonth,
  statisticalRevenueYear,
  statisticalRevenueMonth,
  statisticalInStock,
  statisticalRevenueDateDetail,
  statisticalRevenueMonthDetail,
  statisticalRevenueYearDetail,
};
