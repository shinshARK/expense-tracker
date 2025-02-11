import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses/slice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});
