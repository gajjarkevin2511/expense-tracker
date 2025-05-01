import { toast } from "react-toastify";

import { createAppSlice } from "../../createAppSlice";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "./category.api";

const initialState = {
  categories: [],
  isLoading: false,
};

export const categorySlice = createAppSlice({
  name: "category",
  initialState,
  selectors: {
    selectCategory: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      // get Entity
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.data.data;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      })

      //Create Entity
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action?.payload);
        toast.success(action?.payload?.data.message ?? "Success");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      })
      // update Entity
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action?.payload?.data.message ?? "Success");
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      })
      //delete Entity
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action?.payload)
        toast.success(action?.payload?.data?.message);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        
        state.isLoading = false;
        toast.error(action?.payload ?? "Failed");
      });
  },
});

export const { selectCategory } = categorySlice.selectors;
