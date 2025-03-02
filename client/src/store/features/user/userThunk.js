import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserAPI,
  getUserInfoAPI,
  getUsersAPI,
  getVoucherAPI,
  saveVoucherAPI,
  updateAvatarAPI,
  updateInfoAPI,
} from "./userAPI";
import { getVouchersAPI } from "../voucher/voucherAPI";

const getUserInfo = createAsyncThunk("user/info", async () => {
  try {
    const data = await getUserInfoAPI();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const saveVoucher = createAsyncThunk(
  "user/save-voucher",
  async ({ voucher_id }) => {
    try {
      const data = await saveVoucherAPI({ voucher_id });
      const dataUserInfo = await getUserInfoAPI();
      const dataVouchers = await getVouchersAPI();
      toast.success(data?.message);
      return { data, dataUserInfo, dataVouchers };
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const getVoucher = createAsyncThunk(
  "user/voucher-info",
  async ({ voucher_id }) => {
    console.log(voucher_id);
    try {
      const data = await getVoucherAPI({ voucher_id });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const updateInfo = createAsyncThunk("user/update-info", async (data) => {
  try {
    const dataUpdateInfo = await updateInfoAPI(data);
    const dataUserInfo = await getUserInfoAPI();
    toast.success(dataUpdateInfo.message);
    return dataUserInfo;
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const updateAvatar = createAsyncThunk(
  "user/update-avatar",
  async (formData) => {
    try {
      const dataAvatar = await updateAvatarAPI(formData);
      const dataUserInfo = await getUserInfoAPI();
      toast.success(dataAvatar.message);
      return dataUserInfo;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

const getUsers = createAsyncThunk("user/get-all", async (data) => {
  try {
    const result = await getUsersAPI(data);
    console.log(result);
    return result;
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

const addUser = createAsyncThunk("user/add-user", async (data) => {
  try {
    const dataAddUser = await addUserAPI(data);
    const dataUsers = await getUsersAPI({ page: 1, limit: 5 });
    toast.success(dataAddUser.message);
    return { dataAddUser, dataUsers };
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export {
  getUserInfo,
  saveVoucher,
  getVoucher,
  updateInfo,
  updateAvatar,
  getUsers,
  addUser,
};
