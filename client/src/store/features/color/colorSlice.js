import { createSlice } from "@reduxjs/toolkit";
import {
  addColor,
  deleteColor,
  editColor,
  getColorById,
  getColors,
  getFilterColors,
} from "./colorThunk";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    loading: false,
    colors: [],
    filterColors: [],
    total_colors: null,
    current_page: 1,
    message: null,
    colorById: null,
    isSuccess: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
    setColorById: (state, action) => {
      state.colorById = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
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
      })
      .addCase(addColor.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(addColor.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = action.payload?.message;
      })
      .addCase(editColor.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(editColor.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.filterColors = action.payload?.dataColors.results.colors;
        state.current_page = action.payload?.dataColors.results.current_page;
        state.total_colors = action.payload?.dataColors.results.total_colors;
        state.message = action.payload?.dataEditColor.message;
      })
      .addCase(editColor.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isSuccess = false;
      })
      .addCase(deleteColor.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.filterColors = action.payload?.dataColors.results.colors;
        state.current_page = action.payload?.dataColors.results.current_page;
        state.total_colors = action.payload?.dataColors.results.total_colors;
        state.message = action.payload?.dataEditColor.message;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.isSuccess = false;
      })
      .addCase(getColorById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getColorById.fulfilled, (state, action) => {
        state.loading = false;
        state.colorById = action.payload?.color;
      })
      .addCase(getColorById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setCurrentPage, setColorById, setIsSuccess } =
  colorSlice.actions;
export default colorSlice.reducer;
