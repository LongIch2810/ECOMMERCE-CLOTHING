import { createSlice } from "@reduxjs/toolkit";
import {
  addAddress,
  getAddresses,
  getAddressesByUserId,
  setAddressDefault,
} from "./addressThunk";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    loading: false,
    addresses: null,
    addressesByUserId: null,
    addressItem: null,
    message: null,
    total_addresses: 0,
    total_pages: 1,
    current_page: 1,
  },
  reducers: {
    setAddressItem: (state, action) => {
      state.addressItem = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressesByUserId = action.payload?.dataAddresses.addresses;
        state.message = action.payload?.dataAddAddress?.message;
        state.addressItem = action.payload?.dataAddressDefault.addressDefault;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(getAddressesByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.addressesByUserId = action.payload?.dataAddresses.addresses;
        state.addressItem = action.payload?.dataAddressDefault.addressDefault;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload?.results.addresses;
        state.total_addresses = action.payload?.results.total_addresses;
        state.total_pages = action.payload?.results.total_pages;
        state.current_page = action.payload?.results.current_page;
      })
      .addCase(setAddressDefault.fulfilled, (state, action) => {
        state.loading = false;
        state.addressesByUserId = action.payload?.dataAddresses.addresses;
        state.addressItem = action.payload?.dataAddressDefault.addressDefault;
        state.message = action.payload?.dataSetDefault.message;
      });
  },
});

export const { setAddressItem, setCurrentPage } = addressSlice.actions;
export default addressSlice.reducer;
