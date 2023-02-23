import PaginatedUserList from "features/PaginatedUserList";
import UserSubscriptionAndState from "features/UserSubscriptionAndState";
import UserPrefetch from "features/UserPrefetch";
import FetchUserError from "features/FetchUserError";
import UserMutation from "features/UserMutation";
import CachedUserMutation from "features/CachedUserMutation";
import CancelUserQuery from "features/CancelUserQuery";

export const routes = [
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
