import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const EditBudgetForm = ({ budget, close }) => {
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
      <h2 className="h3">Edit budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <input type="hidden" name="editId" value={budget.id} />
          <label htmlFor="editBudget">Budget Name</label>
          <input
            type="text"
            name="editBudget"
            id="editBudget"
            placeholder="e.g., Groceries"
            defaultValue={budget.name}
            ref={focusRef}
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="editBudgetAmount">Amount</label>
          <input
            type="text"
            name="editBudgetAmount"
            id="editBudgetAmount"
            placeholder="e.g., Rs. 3500"
            defaultValue={budget.amount}
            inputMode="decimal"
            required
          />
        </div>
        <input type="hidden" name="_action" value="editBudget" />
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
              <span>Edit budget</span>
              <PencilSquareIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default EditBudgetForm;
