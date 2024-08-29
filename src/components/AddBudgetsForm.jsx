import React, { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";

const AddBudgetsForm = () => {
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
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            ref={focusRef}
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="text"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., Rs. 3500"
            inputMode="decimal"
            required
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create budget</span>
              <CurrencyRupeeIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetsForm;
