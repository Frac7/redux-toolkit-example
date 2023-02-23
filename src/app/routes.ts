import PaginatedUserList from "features/PaginatedUserList";
import FetchUserError from "features/FetchUserError";
import UserMutation from "features/UserMutation";
import CachedUser from "features/CachedUser";
import UserSubscriptionAndState from "features/UserSubscriptionAndState";
import CancelUserQuery from "features/CancelUserQuery";
// TODO: Evaluate the creation of a component to handle prefetching, see https://redux-toolkit.js.org/rtk-query/usage/prefetching

export const routes = [
  {
    path: "/paginated-user-list",
    title: "Paginated User List",
    component: PaginatedUserList,
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
    path: "/cached-user",
    title: "Cached User",
    component: CachedUser,
  },
  {
    path: "/user-subscription-and-state",
    title: "User subscription and state",
    component: UserSubscriptionAndState,
  },
  {
    path: "/cancel-user-query",
    title: "Cancel User Query",
    component: CancelUserQuery,
  },
];
