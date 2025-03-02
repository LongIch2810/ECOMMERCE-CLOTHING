import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categoryThunk";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    categories: [],
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.categories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export default categorySlice.reducer;
