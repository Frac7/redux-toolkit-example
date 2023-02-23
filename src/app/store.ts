import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";

import userWithActionsReducer from "features/UserWithActions/slice";
import { userApi } from "api/user";
import { rtkQueryErrorLogger } from "./middleware";

export const store = configureStore({
  reducer: {
    userWithActions: userWithActionsReducer,
    // Add the generated reducer as a specific top-level slice
    [userApi.reducerPath]: userApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, rtkQueryErrorLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// See https://redux-toolkit.js.org/tutorials/rtk-query/
