import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register, resetPassword, sendOTP } from "./authThunk";

// Lấy trạng thái đăng nhập từ localStorage
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    message: null,
    isLoggedIn: !!storedUser,
    isResetPassword: false,
    isSendOTP: false,
    savedEmail: "",
  },
  reducers: {
    setSavedEmail: (state, action) => {
      state.savedEmail = action.payload;
    },
    setIsResetPassword: (state, action) => {
      state.isResetPassword = action.payload;
    },
    setIsSendOTP: (state, action) => {
      state.isSendOTP = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.data?.message;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isLoggedIn = false;
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.data?.message;
        state.isLoggedIn = action.payload.success;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.data?.message;
        state.isLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.message = action.payload?.data?.message;
        localStorage.removeItem("user");
      })
      .addCase(sendOTP.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isSendOTP = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isResetPassword = action.payload?.success;
        state.message = action.payload?.message;
        state.savedEmail = "";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setIsResetPassword, setIsSendOTP, setSavedEmail } =
  authSlice.actions;
export default authSlice.reducer;
