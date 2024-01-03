import React from "react";
import TimeAgo from "timeago-react";
import { IToast } from "../../models/toast.model";

/**
 * This toast is shown when a particular status changes
 *
 * @param {IToast} props
 *
 * @returns {React.JSX.Element} component
 */
export const StatusToast = ({
  headerText,
  message,
  id,
  timestamp,
}: IToast): React.JSX.Element => {
  return (
    <div
      id={`toast_${id}`}
      className="mb-2 max-w-md p-4 text-gray-900 bg-white rounded-lg shadow"
      role="alert"
    >
      <div className="flex items-center mb-3">
        <span className="mb-1 text-sm pl-3 font-semibold text-gray-900">
          {headerText}
        </span>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
          data-dismiss-target="#toast-notification"
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
      <div className="flex items-center">
        <div className="ms-3 text-sm font-normal">
          <p className="text-sm font-normal">{message}</p>
          <span className="text-xs font-medium text-orange-600">
            <TimeAgo datetime={timestamp} />
          </span>
        </div>
      </div>
    </div>
  );
};
