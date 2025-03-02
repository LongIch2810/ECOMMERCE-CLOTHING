import { createSlice } from "@reduxjs/toolkit";
import {
  statisticalRevenueMonth,
  statisticalRevenueYear,
  statisticalStatusOrderDate,
  statisticalStatusOrderMonth,
  statisticalStatusOrderYear,
} from "./statisticalThunk";

const statisticalSlice = createSlice({
  name: "statistical",
  initialState: {
    loading: false,
    yearStatusOrder: new Date().getFullYear(),
    yearRevenue: new Date().getFullYear(),
    monthRevenue: new Date().toISOString().slice(0, 7),
    monthStatusOrder: new Date().toISOString().slice(0, 7),
    startDate: "",
    endDate: new Date().toISOString().slice(0, 10),
    dataStatisticalStatusOrder: [],
    dataStatisticalRevenueYear: [],
    dataStatisticalRevenueMonth: [],
    message: null,
  },
  reducers: {
    setYearStatusOrder: (state, action) => {
      state.yearStatusOrder = action.payload;
    },
    setMonthStatusOrder: (state, action) => {
      state.monthStatusOrder = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setYearRevenue: (state, action) => {
      state.yearRevenue = action.payload;
    },
    setMonthRevenue: (state, action) => {
      state.monthRevenue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(statisticalStatusOrderYear.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(statisticalStatusOrderYear.fulfilled, (state, action) => {
        state.loading = false;
        state.dataStatisticalStatusOrder = action.payload?.dataOrders;
      })
      .addCase(statisticalStatusOrderYear.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(statisticalStatusOrderMonth.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(statisticalStatusOrderMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.dataStatisticalStatusOrder = action.payload?.dataOrders;
      })
      .addCase(statisticalStatusOrderMonth.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(statisticalStatusOrderDate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(statisticalStatusOrderDate.fulfilled, (state, action) => {
        state.loading = false;
        state.dataStatisticalStatusOrder = action.payload?.dataOrders;
      })
      .addCase(statisticalStatusOrderDate.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(statisticalRevenueYear.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(statisticalRevenueYear.fulfilled, (state, action) => {
        state.loading = false;
        state.dataStatisticalRevenueYear = action.payload?.dataRevenue;
      })
      .addCase(statisticalRevenueYear.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(statisticalRevenueMonth.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(statisticalRevenueMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.dataStatisticalRevenueMonth = action.payload?.dataRevenue;
      })
      .addCase(statisticalRevenueMonth.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const {
  setEndDate,
  setStartDate,
  setMonthStatusOrder,
  setYearStatusOrder,
  setYearRevenue,
  setMonthRevenue,
} = statisticalSlice.actions;
export default statisticalSlice.reducer;
