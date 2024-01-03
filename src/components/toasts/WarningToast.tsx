import React from "react";
import { useDispatch } from "react-redux";
import * as homeReducers from "../../../src/redux/home/home";
import { IToast } from "../../models/toast.model";
import TimeAgo from "timeago-react";

/**
 * This toast is shown when a successful ACTION is triggered and only if you trigger
 * "addToast" reducer.
 *
 * @param {IToast} props
 *
 * @returns {React.JSX.Element} component
 */
export const WarningToast = ({
  message,
  id,
  timestamp,
}: IToast): React.JSX.Element => {
  const dispatch = useDispatch();

  /**
   * Hides the toast
   */
  const toggleToast = () => {
    try {
      // Delete toast from state
      dispatch(homeReducers.deleteToast({ toastId: id }));

      // Remove toast UI
      const toast = document.getElementById("warningToast");
      if (toast) {
        toast.classList.toggle("hidden");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="warningToast"
      className="flex items-center max-w-md p-4 text-gray-500 bg-white rounded-lg shadow"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg">
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
        </svg>
        <span className="sr-only">Warning icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>&nbsp;
      <span className="text-xs font-medium text-orange-600">
        <TimeAgo datetime={timestamp} />
      </span>
      <button
        type="button"
        onClick={toggleToast}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        data-dismiss-target="#toast-warning"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};
