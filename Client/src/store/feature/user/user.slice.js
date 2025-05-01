import { toast } from "react-toastify";

import { createAppSlice } from "../../createAppSlice";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "./user.api";

const initialState = {
  users: [],
  isLoading: false,
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  selectors: {
    selectUser: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action?.payload?.data.message ?? "Success");
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action?.payload?.data.message ?? "Success");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action?.payload?.data?.message);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      });
  },
});

export const { selectUser } = userSlice.selectors;