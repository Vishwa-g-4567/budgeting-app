import React from "react";
import {
  calculateSpentByBudget,
  formateCurrency,
  formatPercentage,
} from "../helpers";
import { Form, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import EditBudgetForm from "./EditBudgetForm";
import {
  BanknotesIcon,
  TrashIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formateCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formateCurrency(spent)} spent</small>
        <small>{formateCurrency(amount - spent)} remaining</small>
      </div>
      <div className="flex-lg" style={{ justifyContent: "center" }}>
        {showDelete ? (
          <div className="flex-sm">
            <Form
              method="post"
              action="delete"
              onSubmit={(e) => {
                if (
                  !confirm(
                    "Are you sure you want to permanently delete this budget?"
                  )
                ) {
                  e.preventDefault();
                }
              }}
            >
              <button type="submit" className="btn">
                <span>Delete Budget</span>
                <TrashIcon width={20} />
              </button>
            </Form>
          </div>
        ) : (
          <div className="flex-sm">
            <Link
              to={`/budget/${id}`}
              className="btn"
              style={{ color: "white" }}
            >
              <span>View Details</span>
              <BanknotesIcon width={20} />
            </Link>
          </div>
        )}
        <div className="flex-sm">
          <Popup
            trigger={
              <button className="btn btn--dark">
                <span>Edit Budget</span>
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
                <EditBudgetForm budget={budget} close={close} />
              </>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
