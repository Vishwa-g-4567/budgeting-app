import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="error">
      <h1>Uh oh! We've got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          Go Back
        </button>
        <Link to="/" className="btn btn--dark" style={{ color: "white" }}>
          <HomeIcon width={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
