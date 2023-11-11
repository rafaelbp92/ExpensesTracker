import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import moment from "moment";

function RecentExpenses() {
  const expenseContext = useContext(ExpensesContext);

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = moment(new Date());
    const startDate = today.subtract(7, "days");
    return expense.date >= startDate.toDate();
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses existent for the last 7 days"
    />
  );
}

export default RecentExpenses;
