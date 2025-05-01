import { toast } from "react-toastify";

import { createAppSlice } from "../../createAppSlice";
import {
  createExpense,
  deleteExpense,
  getExpense,
  updateExpense,
} from "./expense.api";

const initialState = {
  expenses: [],
  isLoading: false,
};

export const expenseSlice = createAppSlice({
  name: "expense",
  initialState,
  selectors: {
    selectExpense: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      // get Expense
      .addCase(getExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload.data.data;
      })
      .addCase(getExpense.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      })

      // Create Expense
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action?.payload?.data.message ?? "Success");
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      })

      // Update Expense
      .addCase(updateExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action?.payload?.data.message ?? "Success");
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      })

      // Delete Expense
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action?.payload?.data?.message);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      });
  },
});

export const { selectExpense } = expenseSlice.selectors;