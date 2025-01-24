import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function RecentExpensesScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  // const [fetchedExpenses, setFetchedExpenses] = useState([]);
  async function getExpenses() {
    setIsFetching(true);
    try {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    } catch (error) {
      setError("Could not fetch expenses!");
    }
    setIsFetching(false);
    // setFetchedExpenses(expenses);
  }

  useEffect(() => {
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
    getExpenses();
  }

  if (error && !isFetching) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={errorHandler}
        buttonText={"Retry"}
      />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const aWeekAgo = getDateMinusDays(today, 7);

    return expense.date > aWeekAgo;
  });

  return (
    // <View style={styles.rootContainer}>
    // {/* <Text>This is the recent expenses screen</Text> */}
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 days"}
      fallBackText={"You havent added any expenses for the last 7 days."}
    />
    // </View>
  );
}

export default RecentExpensesScreen;

// const styles = StyleSheet.create({
//   rootContainer: {
//     flex: 1,
//   },
// });
