import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExpenses,
  selectExpensesError,
  selectExpensesStatus,
} from "../store/redux/expenses/selectors";
import {
  addExpenseThunk,
  deleteExpenseThunk,
  updateExpenseThunk,
} from "../store/redux/expenses/thunks";

function ManageExpenseScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const status = useSelector(selectExpensesStatus);
  const expenses = useSelector(selectExpenses);
  const error = useSelector(selectExpensesError);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    // sebelumnya expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    dispatch(deleteExpenseThunk(editedExpenseId)).then(() =>
      navigation.goBack()
    );
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    if (isEditing) {
      dispatch(
        updateExpenseThunk({ id: editedExpenseId, data: expenseData })
      ).then(() => navigation.goBack());
    } else {
      dispatch(addExpenseThunk(expenseData)).then(() => navigation.goBack());
    }
  }

  if (error && status !== "loading") {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={errorHandler}
        buttonText={"Okay"}
      />
    );
  }

  if (status === "loading") {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
