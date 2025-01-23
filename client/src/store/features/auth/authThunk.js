import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, logoutAPI, registerAPI } from "./authAPI";
import { toast } from "react-toastify";
import { getUserInfoAPI } from "../user/userAPI";

const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const data = await loginAPI(credentials);
    toast.success(data.message);
    const dataUserInfo = await getUserInfoAPI();
    return { data, dataUserInfo };
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const register = createAsyncThunk("auth/register", async (credentials) => {
  try {
    const data = await registerAPI(credentials);
    console.log(data);
    toast.success(data.message);
    const dataUserInfo = await getUserInfoAPI();
    return { data, dataUserInfo };
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const data = await logoutAPI();
    console.log(data);
    toast.success(data.message);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export { login, register, logout };
