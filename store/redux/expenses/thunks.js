import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  storeExpense,
  fetchExpenses,
  updateExpense,
  deleteExpense,
} from "../../../util/http";

export const addExpenseThunk = createAsyncThunk(
  "expenses/add",
  async (expenseData) => {
    const id = await storeExpense(expenseData);
    return { ...expenseData, id };
  }
);

export const fetchExpensesThunk = createAsyncThunk(
  "expenses/fetch",
  async () => {
    const expenses = await fetchExpenses();
    return expenses.reverse(); // Maintain your inverted order
  }
);

export const updateExpenseThunk = createAsyncThunk(
  "expenses/update",
  async ({ id, data }) => {
    await updateExpense(id, data);
    return { id, data };
  }
);

export const deleteExpenseThunk = createAsyncThunk(
  "expenses/delete",
  async (id) => {
    await deleteExpense(id);
    return id;
  }
);
