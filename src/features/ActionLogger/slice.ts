import { createSelector, createSlice } from "@reduxjs/toolkit";

import { RootState } from "app/store";
import { CONTAINER_KEY, MAX_ACTIONS_TO_STORE } from "./constants";

export interface ActionLoggerState {
  actions: string[];
}

const initialState: ActionLoggerState = {
  actions: [],
};

export const actionLoggerSlice = createSlice({
  name: CONTAINER_KEY,
  initialState,
  reducers: {
    logAction: (state, action) => {
      state.actions.unshift(action.payload);
      state.actions.splice(MAX_ACTIONS_TO_STORE);
    },
  },
});

export const { logAction } = actionLoggerSlice.actions;

export const selectActions = createSelector(
  (state: RootState) => state.actionLogger,
  (actionLogger) => actionLogger.actions
);

export default actionLoggerSlice.reducer;
