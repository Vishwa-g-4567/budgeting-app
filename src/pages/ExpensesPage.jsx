import React from "react";
import { deleteItem, editExpense, fetchData } from "../helpers";
import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { toast } from "react-toastify";

export const expensesLoader = () => {
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { budgets, expenses };
};

export const expensesAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "editExpense") {
    try {
      editExpense({
        id: values.editId,
        name: values.editExpense,
        amount: values.editExpenseAmount,
        budgetId: values.editExpenseBudget,
      });
      return toast.success(
        `Expense ${values.editExpense} edited successfullly!`
      );
    } catch (error) {
      throw new Error("There was a problem creating your expense.");
    }
  }
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense ${values.expenseName} deleted!`);
    } catch (error) {
      throw new Error("There was a problem creating your expense.");
    }
  }
};

const ExpensesPage = () => {
  const { budgets, expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} Total)</small>
          </h2>
          <Table expenses={expenses} budgets={budgets} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
