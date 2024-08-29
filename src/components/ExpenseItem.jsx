import React from "react";
import {
  formatDateToLocaleString,
  formateCurrency,
  getAllMatchingItems,
} from "../helpers";
import { Link, useFetcher } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import Popup from "reactjs-popup";
import EditExpenseForm from "./EditExpenseForm";

const ExpenseItem = ({ budgets, expense, showBudget }) => {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  const fetcher = useFetcher();
  return (
    <>
      <td>{expense.name}</td>
      <td>{formateCurrency(expense.amount)}</td>
      <td>
        {formatDateToLocaleString(expense.createdAt)
          .replace("am", "AM")
          .replace("pm", "PM")}
      </td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{ "--accent": budget.color }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <Popup
          trigger={
            <button className="btn btn--dark">
              <PencilSquareIcon width={20} />
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <>
              <button
                style={{
                  backgroundColor: "transparent",
                  borderStyle: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "end",
                }}
                onClick={() => close()}
              >
                <XCircleIcon width={25} />
              </button>
              <EditExpenseForm
                expense={expense}
                budget={budget}
                budgets={budgets}
                close={close}
              />
            </>
          )}
        </Popup>
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <input type="hidden" name="expenseName" value={expense.name} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
