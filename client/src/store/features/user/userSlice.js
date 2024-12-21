import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./userThunk";
import { login, logout, register } from "../auth/authThunk";
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.message = null;
        state.user = action.payload?.dataUserInfo?.user;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = null;
        state.user = action.payload?.dataUserInfo?.user;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
