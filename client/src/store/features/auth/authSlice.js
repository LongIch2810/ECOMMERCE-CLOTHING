import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./authThunk";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    message: null,
    isLoggedIn: false,
  },
  reducers: {},
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
        state.message = action.payload?.data?.message;
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.data?.message;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.data?.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.message = action.payload?.data?.message;
      });
  },
});

export default authSlice.reducer;
