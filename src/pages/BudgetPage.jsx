import React from "react";
import { useLoaderData } from "react-router-dom";
import {
  fetchData,
  createExpense,
  deleteItem,
  getAllMatchingItems,
  editExpense,
  editBudget,
} from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

export const budgetLoader = async ({ params }) => {
  const budgets = fetchData("budgets");
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist");
  }
  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });
  return { budgets, budget, expenses };
};

export const budgetAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "editBudget") {
    try {
      editBudget({
        id: values.editId,
        name: values.editBudget,
        amount: values.editBudgetAmount,
      });
      return toast.success(
        `${values.editBudget} has been edited Successfully!`
      );
    } catch (error) {
      throw new Error("There was a problem creating your budget.");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (error) {
      throw new Error("There was a problem creating your expense.");
    }
  }
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

const BudgetPage = () => {
  const { budgets, budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table budgets={budgets} expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
