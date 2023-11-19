import axios from "axios";

const ENDPOINT_URL =
  "https://expense-tracker-48326-default-rtdb.europe-west1.firebasedatabase.app";

export async function storeExpense(expenseData) {
  const response = axios.post(ENDPOINT_URL + "/expenses.json", expenseData);
  return (await response).data.name; //Id;
}

export async function fetchExpenses() {
  const response = await axios.get(ENDPOINT_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const data = response.data[key];
    const expenseObj = {
      id: key,
      amount: data.amount,
      date: new Date(data.date),
      description: data.description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
    return axios.put(ENDPOINT_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(ENDPOINT_URL + `/expenses/${id}.json`);
}
