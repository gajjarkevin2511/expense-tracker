import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../../services/api";
import ErrorHandler from "../../../utils/errors";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("category");
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/category", payload);
      await dispatch(getCategory()).unwrap();
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "entity/updateCategory",
  async ({ categoryId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`category/${categoryId}`, payload);
      await dispatch(getCategory()).unwrap();
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ categoryId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`category/${categoryId}`);
      await dispatch(getCategory()).unwrap();
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);
