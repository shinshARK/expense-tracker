import { StyleSheet, View, Text, Button } from "react-native";
import { GlobalStyles } from "../../constants/styles";
function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    // console.log(sum);
    // console.log(expense.amount);
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>{periodName}</Text>
      <Text style={styles.amountText}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  rootContainer: {
    // margin: 8,
    marginBottom: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  amountText: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
