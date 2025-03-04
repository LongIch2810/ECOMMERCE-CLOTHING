import { createSlice } from "@reduxjs/toolkit";
import { getColors, getFilterColors } from "./colorThunk";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    loading: false,
    colors: [],
    filterColors: [],
    total_colors: null,
    current_page: 1,
    message: null,
    isSuccess: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload?.colors;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(getFilterColors.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilterColors.fulfilled, (state, action) => {
        state.loading = false;
        state.filterColors = action.payload?.results.colors;
        state.total_colors = action.payload?.results.total_colors;
        state.current_page = action.payload?.results.current_page;
      })
      .addCase(getFilterColors.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setCurrentPage } = colorSlice.actions;
export default colorSlice.reducer;
