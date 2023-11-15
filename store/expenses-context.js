import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Rent",
    amount: 1000,
    date: new Date(2022, 11, 10),
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
    date: new Date(2022, 1, 1),
  },
  {
    id: "e4",
    description: "Movies",
    amount: 30,
    date: new Date(2022, 11, 9),
  },
  {
    id: "e5",
    description: "Book",
    amount: 45.5,
    date: new Date(2022, 8, 2),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
