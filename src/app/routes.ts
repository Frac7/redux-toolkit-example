import UserWithActions from "features/UserWithActions";
import PaginatedUserList from "features/PaginatedUserList";
import UserSubscriptionAndState from "features/UserSubscriptionAndState";
import UserPrefetch from "features/UserPrefetch";
import UserPolling from "features/UserPolling";
import UserEventSource from "features/UserEventSource";
import FetchUserError from "features/FetchUserError";
import UserMutation from "features/UserMutation";
import CachedUserMutation from "features/CachedUserMutation";
import CancelUserQuery from "features/CancelUserQuery";

import { RouteDefinition } from "./types";

export const routes: RouteDefinition[] = [
  {
    path: "/user-with-actions",
    title: "User with actions and async actions",
    component: UserWithActions,
  },
  {
    path: "/paginated-user-list",
    title: "Paginated User List",
    component: PaginatedUserList,
  },
  {
    path: "/user-subscription-and-state",
    title: "User subscription and state",
    component: UserSubscriptionAndState,
  },
  {
    path: "/user-prefetch",
    title: "User prefetch",
    component: UserPrefetch,
  },
  {
    path: "/user-polling",
    title: "User polling",
    component: UserPolling,
  },
  {
    path: "/user-event-source",
    title: "User Event Source",
    component: UserEventSource,
  },
  {
    path: "/fetch-user-error",
    title: "Fetch User Error",
    component: FetchUserError,
  },
  {
    path: "/user-mutation",
    title: "User Mutation",
    component: UserMutation,
  },
  {
    path: "/cached-user-mutation",
    title: "Cached User Mutation",
    component: CachedUserMutation,
  },
  {
    path: "/cancel-user-query",
    title: "Cancel User Query",
    component: CancelUserQuery,
  },
];
