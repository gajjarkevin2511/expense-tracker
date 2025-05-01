import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../../services/api";
import ErrorHandler from "../../../utils/errors";

export const getExpense = createAsyncThunk(
  "expense/getExpense",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("expense");
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createExpense = createAsyncThunk(
  "expense/createExpense",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/expense", payload);
      await dispatch(getExpense()).unwrap();
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async ({ expenseId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`expense/${expenseId}`, payload);
      await dispatch(getExpense()).unwrap();
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async ({ expenseId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`expense/${expenseId}`);
      await dispatch(getExpense()).unwrap();
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);