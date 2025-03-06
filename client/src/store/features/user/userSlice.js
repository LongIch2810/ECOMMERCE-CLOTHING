import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUserInfo,
  getUsers,
  saveVoucher,
  updateAvatar,
  updateInfo,
} from "./userThunk";
import { login, logout, register } from "../auth/authThunk";
import { addOrder } from "../order/orderThunk";
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    userById: null,
    message: null,
    role: null,
    current_page: 1,
    total_users: 0,
    isSuccess: false,
    users: [],
  },
  reducers: {
    setVoucherInfo: (state, action) => {
      state.voucherInfo = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.message = null;
        state.user = action.payload?.dataUserInfo?.user;
        state.role = action.payload?.dataUserInfo?.user.role;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = null;
        state.user = action.payload?.dataUserInfo?.user;
        state.role = action.payload?.dataUserInfo?.user.role;
      })
      .addCase(saveVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.data?.message;
        state.user = action.payload?.dataUserInfo?.user;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.role = null;
      })
      .addCase(updateAvatar.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(updateInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(updateInfo.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.voucherInfo = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload?.results.users;
        state.total_users = action.payload?.results.total_users;
        state.current_page = action.payload?.results.current_page;
      })
      .addCase(addUser.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload?.dataUsers.results.users;
        state.total_users = action.payload?.dataUsers.results.total_users;
        state.current_page = action.payload?.dataUsers.results.current_page;
        state.message = action.payload?.dataAddUser.message;
        state.isSuccess = action.payload?.dataAddUser.success;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(editUser.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload?.dataUsers.results.users;
        state.total_users = action.payload?.dataUsers.results.total_users;
        state.current_page = action.payload?.dataUsers.results.current_page;
        state.message = action.payload?.dataEditUser.message;
        state.isSuccess = true;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload?.dataUsers.results.users;
        state.total_users = action.payload?.dataUsers.results.total_users;
        state.current_page = action.payload?.dataUsers.results.current_page;
        state.message = action.payload?.dataDeleteUser.message;
        state.isSuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getUserById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userById = action.payload?.user;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setVoucherInfo, setCurrentPage, setIsSuccess } =
  userSlice.actions;
export default userSlice.reducer;
