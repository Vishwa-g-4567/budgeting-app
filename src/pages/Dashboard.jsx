import React from "react";
import {
  createBudget,
  createExpense,
  deleteItem,
  editBudget,
  editExpense,
  fetchData,
  wait,
} from "../helpers";
import { Link, useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetsForm from "../components/AddBudgetsForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
};

export const dashboardAction = async ({ request }) => {
  await wait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account.");
    }
  }
  if (_action === "createBudget") {
    try {
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      return toast.success(
        `${values.newBudget} budget has been Successfully Created!`
      );
    } catch (error) {
      throw new Error("There was a problem creating your budget.");
    }
  }
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

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetsForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                      budgets={budgets}
                    />
                    {expenses.length > 8 && (
                      <Link
                        to="expenses"
                        className="btn btn--dark"
                        style={{ color: "white" }}
                      >
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetsForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
