import { toast } from "react-toastify";

import { createAppSlice } from "../../createAppSlice";
import { getPercentage, getPrediction, getTopDaysByExpenditure } from "./statistics.api";

const initialState = {
  top3Days: [],
  percentage: null,
  prediction: null,
  isLoading: false,
};

export const statisticsSlice = createAppSlice({
  name: "statistics",
  initialState,
  selectors: {
    selectStatistics: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      // Get Statistics
      .addCase(getTopDaysByExpenditure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopDaysByExpenditure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.top3Days = action.payload.data;
      })
      .addCase(getTopDaysByExpenditure.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      })
    // prediction
    .addCase(getPrediction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getPrediction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.prediction = action.payload.data;
    })
    .addCase(getPrediction.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action?.payload ?? "Failed");
    })
    // //percentage

    .addCase(getPercentage.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getPercentage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.percentage = action.payload.data;
    })
    .addCase(getPercentage.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action?.payload ?? "Failed");
    });

    // Create Statistic
  },
});

export const { selectStatistics } = statisticsSlice.selectors;
