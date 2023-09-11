import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Rent",
    amount: 1000,
    date: new Date(2023, 9, 5),
  },
  {
    id: "e2",
    description: "Clothes",
    amount: 99.9,
    date: new Date(2022, 1, 3),
  },
  {
    id: "e3",
    description: "Meals",
    amount: 150.3,
    date: new Date(2023, 1, 1),
  },
  {
    id: "e4",
    description: "Movies",
    amount: 30,
    date: new Date(2023, 1, 1),
  },
  {
    id: "e5",
    description: "Book",
    amount: 45.5,
    date: new Date(2023, 8, 2),
  },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})
