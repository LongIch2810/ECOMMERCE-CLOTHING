import { createSlice } from "@reduxjs/toolkit";
import {
  addImportReceipt,
  fetchImportReceiptDetail,
  getFilterImportReceipts,
} from "./importReceiptThunk";

const importReceiptSlice = createSlice({
  name: "import-receipt",
  initialState: {
    loading: false,
    importReceipts: [],
    total_importReceipts: 0,
    current_page: 1,
    message: null,
    importReceiptDetail: null,
    isSuccess: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.current_page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addImportReceipt.pending, (state, action) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(addImportReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(addImportReceipt.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = action.payload?.message;
      })
      .addCase(getFilterImportReceipts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilterImportReceipts.fulfilled, (state, action) => {
        state.loading = false;
        state.total_importReceipts =
          action.payload?.results.total_importReceipts;
        state.importReceipts = action.payload?.results.importReceipts;
        state.current_page = action.payload?.results.current_page;
      })
      .addCase(getFilterImportReceipts.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(fetchImportReceiptDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchImportReceiptDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.importReceiptDetail = action.payload?.importReceipt;
      })
      .addCase(fetchImportReceiptDetail.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { setCurrentPage } = importReceiptSlice.actions;
export default importReceiptSlice.reducer;
