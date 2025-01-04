import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    fullname: null,
    addressDetail: null,
    phone: null,
  },
  reducers: {
    setFullname: (state, action) => {
      state.fullname = action.payload;
    },
    setAddressDetail: (state, action) => {
      state.addressDetail = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
