import React from "react";
import ExpenseItem from "./ExpenseItem";

const Table = ({ budgets, expenses, showBudget = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {[
              "Name",
              "Amount",
              "Created At",
              showBudget ? "Budget" : "",
              "",
              "",
            ].map((i, index) => (
              <th key={index} className="bg-red-500">
                {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem
                expense={expense}
                budgets={budgets}
                showBudget={showBudget}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
