import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
  addImportReceiptAPI,
  fetchImportReceiptDetailAPI,
  getFilterImportReceiptsAPI,
} from "./importReceiptAPI";

const addImportReceipt = createAsyncThunk(
  "import-receipt/add-import-receipt",
  async (data) => {
    try {
      const result = await addImportReceiptAPI(data);
      toast.success(result.message);
      return result;
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

const getFilterImportReceipts = createAsyncThunk(
  "import-receipt/filter",
  async (data) => {
    try {
      const result = await getFilterImportReceiptsAPI(data);
      return result;
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

const fetchImportReceiptDetail = createAsyncThunk(
  "import-receipt/get-importReceipt-id",
  async (importReceiptId) => {
    try {
      const data = await fetchImportReceiptDetailAPI(importReceiptId);
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
  }
);

export { addImportReceipt, getFilterImportReceipts, fetchImportReceiptDetail };
