import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const EditExpenseForm = ({ budgets, budget, expense, close }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);
  return (
    <div
      className="form-wrapper"
      style={{ backgroundColor: "white", zIndex: "0" }}
    >
      <h2 className="h3">
        Edit <span className="accent">{budget.name}</span> Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <input type="hidden" name="editId" value={expense.id} />
          <label htmlFor="editExpense">Expense Name</label>
          <input
            type="text"
            name="editExpense"
            id="editExpense"
            placeholder="e.g., Coffee"
            defaultValue={expense.name}
            ref={focusRef}
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="editExpenseAmount">Amount</label>
          <input
            type="number"
            step={0.01}
            inputMode="decimal"
            name="editExpenseAmount"
            id="editExpenseAmount"
            placeholder="e.g., 3.50"
            defaultValue={expense.amount}
            required
          />
        </div>
        <div className="grid-xs" hidden={budget.length === 1}>
          <label htmlFor="editExpenseBudget">Budget Category</label>
          <select
            name="editExpenseBudget"
            id="editExpenseBudget"
            defaultValue={budget.id}
            required
          >
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="editExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span>Submitting...</span>
              <span style={{ display: "none" }}>
                {setTimeout(() => close(), 1000)}
              </span>
            </>
          ) : (
            <>
              <span>Edit Expense</span>
              <PencilSquareIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default EditExpenseForm;
