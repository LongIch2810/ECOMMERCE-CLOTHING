import { createSlice } from "@reduxjs/toolkit";
import { addAddress, getAddresses } from "./addressThunk";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    loading: false,
    addresses: null,
    addressDefault: null,
    message: null,
  },
  reducers: {
    setAddressDefault: (state, action) => {
      state.addressDefault = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload?.dataAddresses?.addresses;
        state.message = action.payload?.dataAddAddress?.message;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload?.dataAddresses?.addresses;
        state.addressDefault =
          action.payload?.dataAddressDefault?.addressDefault;
      });
  },
});

export const { setAddressDefault } = addressSlice.actions;
export default addressSlice.reducer;
