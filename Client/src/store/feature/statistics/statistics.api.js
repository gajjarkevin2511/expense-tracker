import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../../services/api";
import ErrorHandler from "../../../utils/errors";

export const getTopDaysByExpenditure = createAsyncThunk(
  "statistics/getStatistics",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/expense/topDays/${userId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getPercentage = createAsyncThunk(
  "statistics/getPercentage",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/expense/percentage/${userId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getPrediction = createAsyncThunk(
  "statistics/prediction",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/expense/prediction/${userId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);
