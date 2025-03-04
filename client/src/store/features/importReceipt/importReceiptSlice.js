import { createSlice } from "@reduxjs/toolkit";
import { addImportReceipt } from "./importReceiptThunk";

const importReceiptSlice = createSlice({
  name: "import-receipt",
  initialState: {
    loading: false,
    importReceipts: [],
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
      });
  },
});

export const { setCurrentPage } = importReceiptSlice.actions;
export default importReceiptSlice.reducer;
