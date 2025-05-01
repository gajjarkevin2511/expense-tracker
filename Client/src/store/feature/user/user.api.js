import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../../services/api";
import ErrorHandler from "../../../utils/errors";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("user");
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/user", payload);
      await dispatch(getUsers()).unwrap();
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`user/${userId}`, payload);
      await dispatch(getUsers()).unwrap();
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ userId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`user/${userId}`);
      await dispatch(getUsers()).unwrap();
      return response;
    } catch (error) {
      const errorMessage = ErrorHandler.handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);