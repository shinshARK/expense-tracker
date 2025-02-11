import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getDateMinusDays } from "../util/date";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import {
  selectExpenses,
  selectExpensesError,
  selectExpensesStatus,
} from "../store/redux/expenses/selectors";
import { fetchExpensesThunk } from "../store/redux/expenses/thunks";

function RecentExpensesScreen() {
  const dispatch = useDispatch();

  const status = useSelector(selectExpensesStatus);
  const expenses = useSelector(selectExpenses);
  const error = useSelector(selectExpensesError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExpensesThunk());
    }
  }, [status, dispatch]);

  function errorHandler() {
    dispatch(fetchExpensesThunk());
  }

  if (error && status !== "loading") {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={errorHandler}
        buttonText={"Retry"}
      />
    );
  }

  if (status === "loading") {
    return <LoadingOverlay />;
  }

  const today = new Date();
  const aWeekAgo = getDateMinusDays(today, 7);
  const recentExpenses = expenses.filter((expense) => {
    return new Date(expense.date) > aWeekAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 days"}
      fallBackText={"You havent added any expenses for the last 7 days."}
    />
  );
}

export default RecentExpensesScreen;
