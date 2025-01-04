import { createSlice } from "@reduxjs/toolkit";

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    shipping_method: null,
    shipping_price: 0,
  },
  reducers: {
    setShippingMethod: (state, action) => {
      state.shipping_method = action.payload;
    },
    setShippingPrice: (state, action) => {
      state.shipping_price = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setShipping } = shippingSlice.actions;
export default shippingSlice.reducer;
