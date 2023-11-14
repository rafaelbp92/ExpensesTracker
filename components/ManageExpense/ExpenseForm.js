import { StyleSheet, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import CustomButton from "../UI/CustomButton";

function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  selectedExpense,
}) {
  const [inputValues, setInputValues] = useState({
    amount: selectedExpense ? selectedExpense.amount.toString() : "",
    date: selectedExpense ? selectedExpense.date.toISOString().slice(0, 10) : "",
    description: selectedExpense ? selectedExpense.description : "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues(() => {
      return { ...inputValues, [inputIdentifier]: enteredValue };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: parseFloat(inputValues.amount),
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid= expenseData.date.toDateString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      alert("Please provide valid inputs");
      return;
    }

    onSubmit(expenseData);
  }

  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangedHandler.bind(this, "amount"),
          value: inputValues.amount,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, "date"),
          value: inputValues.date,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          numberOfLines: 4,
          minHeight: 100,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
          //autoCorrect: false // default is true
        }}
      />
      <View style={styles.buttonsContainer}>
        <CustomButton mode="flat" style={styles.button} onPress={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </CustomButton>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
