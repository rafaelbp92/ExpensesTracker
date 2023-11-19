import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: ({ description, amount, date }) => {},
  addExpense: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "SET":
      const sortedExpenses = action.payload.sort((a, b) => a.date < b.date ? 1 : -1);
      return sortedExpenses;
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const updatebleExpenseIndex = state.findIndex((expense) => {
        return expense.id === action.payload.id;
      });

      const updatableExpense = state[updatebleExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const newState = [...state];
      newState[updatebleExpenseIndex] = updatedItem;

      return newState;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
