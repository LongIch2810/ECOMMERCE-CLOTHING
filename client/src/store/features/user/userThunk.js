import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserInfoAPI } from "./userAPI";

const getUserInfo = createAsyncThunk("user/info", async () => {
  try {
    const data = await getUserInfoAPI();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return error.response.data;
    }
    console.log(error);
    return error;
  }
});
export { getUserInfo };
