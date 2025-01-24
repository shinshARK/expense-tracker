import { View, Text, StyleSheet, FlatList } from "react-native";
import ExpenseItem from "../components/ExpensesOutput/ExpenseItem";
import ExpenseAggregate from "../components/ExpensesOutput/ExpensesSummary";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpensesScreen() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod={"Total Expenses"}
      fallBackText={"No expenses yet!"}
    />
    // </View>
  );
}

export default AllExpensesScreen;

// const styles = StyleSheet.create({
//   rootContainer: {
//     flex: 1,
//   },
// });
