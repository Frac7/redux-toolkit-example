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
      dispatch(logAction(action.type));
    }

    return next(action);
  };

export default actionLoggerMiddleware;
