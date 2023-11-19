import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import moment from "moment";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function RecentExpenses() {
  const [isFetching, setIsFecthing] = useState(true);
  const expenseContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFecthing(true);
      const expenses = await fetchExpenses();
      expenseContext.setExpenses(expenses);
    }

    getExpenses();
  }, []);

  if (!isFetching) {
    return <LoadingOverlay />;
  }

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
