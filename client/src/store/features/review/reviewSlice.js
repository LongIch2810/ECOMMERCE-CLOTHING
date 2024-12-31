import { createSlice } from "@reduxjs/toolkit";
import { addReview, getReviews } from "./reviewThunk";
import { getProductDetail } from "../product/productThunk";
const reviewSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    reviews: null,
    message: null,
    success: false,
  },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload?.dataReview?.reviews;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(addReview.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload?.dataReviews?.reviews;
        state.message = action.payload?.dataAddReview?.message;
        state.success = action.payload?.dataAddReview?.success;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});
export const { setSuccess } = reviewSlice.actions;
export default reviewSlice.reducer;
