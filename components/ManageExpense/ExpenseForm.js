import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import CustomButton from "../UI/CustomButton";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  selectedExpense,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: selectedExpense ? selectedExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: selectedExpense
        ? selectedExpense.date.toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
    description: {
      value: selectedExpense ? selectedExpense.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: parseFloat(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toDateString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View>
      <Input
        label="Amount"
        invalid={!inputs.amount.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangedHandler.bind(this, "amount"),
          value: inputs.amount.value,
        }}
      />
      <Input
        label="Date"
        invalid={!inputs.date.isValid}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, "date"),
          value: inputs.date.value,
        }}
      />
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          numberOfLines: 4,
          minHeight: 100,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
          //autoCorrect: false // default is true
        }}
      />
      {formIsInValid && (
        <Text style={styles.errorText}>
          Invalid input values - Please check the entered data!
        </Text>
      )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
