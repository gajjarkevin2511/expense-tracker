import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { categorySlice } from "./feature/category/category.slice";
import { userSlice } from "./feature/user/user.slice";
import { expenseSlice } from "./feature/expense/expense.slice";
import { statisticsSlice } from "./feature/statistics/statistics.slice";

const rootReducer = combineSlices(
  categorySlice,
  userSlice, // Add this line
  expenseSlice, // Add this line
  statisticsSlice // Add this line
);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};
