import type { MiddlewareAPI, Middleware, Action } from "@reduxjs/toolkit";
import { logAction } from "./slice";

const isLoggerAction = (action: Action) => {
  return action.type === logAction.type;
};

const actionLoggerMiddleware: Middleware =
  ({ getState, dispatch }: MiddlewareAPI) =>
  (next) =>
  (action) => {
    if (!isLoggerAction(action)) {
      const payload = {
        type: action.type,
        payload: JSON.stringify(action.payload, null, 2),
      };

      dispatch(logAction(payload));
    }

    return next(action);
  };

export default actionLoggerMiddleware;
