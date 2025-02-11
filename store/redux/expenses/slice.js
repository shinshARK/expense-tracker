import { createSlice } from "@reduxjs/toolkit";
import {
  fetchExpensesThunk,
  addExpenseThunk,
  updateExpenseThunk,
  deleteExpenseThunk,
} from "./thunks";

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Expenses
      .addCase(fetchExpensesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpensesThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchExpensesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add Expense
      .addCase(addExpenseThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addExpenseThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(addExpenseThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update Expense
      .addCase(updateExpenseThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateExpenseThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (expense) => expense.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index], // destructure data sebelumnya
            ...action.payload.data, // overwrite dengan update
          };
        }
      })
      .addCase(updateExpenseThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete Expense
      .addCase(deleteExpenseThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteExpenseThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (expense) => expense.id !== action.payload
        );
      })
      .addCase(deleteExpenseThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default expensesSlice.reducer;
