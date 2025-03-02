import { createSlice } from "@reduxjs/toolkit";
import { getGenders } from "./genderThunk";

const genderSlice = createSlice({
  name: "gender",
  initialState: {
    loading: false,
    genders: [],
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getGenders.fulfilled, (state, action) => {
        state.loading = false;
        state.genders = action.payload?.genders;
      })
      .addCase(getGenders.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export default genderSlice.reducer;
