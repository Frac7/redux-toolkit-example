import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { message } from "antd";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      message.error(`${action.payload.status}: ${action.error.message}`);
    }

    if (isPending(action)) {
      message.info(action.meta.requestStatus.toUpperCase());
    }

    if (isFulfilled(action)) {
      message.success(action.meta.requestStatus.toUpperCase());
    }

    return next(action);
  };
