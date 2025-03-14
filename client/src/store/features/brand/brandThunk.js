import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBrandAPI,
  deleteBrandAPI,
  editBrandAPI,
  getBrandByIdAPI,
  getBrandsAPI,
  getFilterBrandsAPI,
} from "./brandAPI";
import { toast } from "react-toastify";

const getBrands = createAsyncThunk("brand/list", async () => {
  try {
    const data = await getBrandsAPI();
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

const getFilterBrands = createAsyncThunk("brand/filter", async (data) => {
  try {
    const result = await getFilterBrandsAPI(data);
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

const addBrand = createAsyncThunk("brand/add-brand", async (data) => {
  try {
    const dataAddBrand = await addBrandAPI(data);
    const dataBrands = await getFilterBrandsAPI();
    toast.success(dataAddBrand.message);
    return { dataAddBrand, dataBrands };
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

const editBrand = createAsyncThunk("brand/edit-brand", async (data) => {
  try {
    const dataEditBrand = await editBrandAPI(data);
    const dataBrands = await getFilterBrandsAPI();
    toast.success(dataEditBrand.message);
    return { dataEditBrand, dataBrands };
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

const deleteBrand = createAsyncThunk("brand/delete-brand", async (brandId) => {
  try {
    const dataDeleteBrand = await deleteBrandAPI(brandId);
    const dataBrands = await getFilterBrandsAPI();
    toast.success(dataDeleteBrand.message);
    return { dataDeleteBrand, dataBrands };
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

const getBrandById = createAsyncThunk("brand/get-brand-id", async (brandId) => {
  console.log(brandId);
  try {
    const data = await getBrandByIdAPI(brandId);
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
  getBrands,
  getFilterBrands,
  addBrand,
  editBrand,
  deleteBrand,
  getBrandById,
};
