import UserList from "features/UserList";
import PaginatedUserList from "features/PaginatedUserList";
// import CachedUser from "features/CachedUser"; // See https://redux-toolkit.js.org/rtk-query/usage/cache-behavior and https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates
import CancelUserQuery from "features/CancelUserQuery";
import UserMutation from "features/UserMutation";
import FetchUserError from "features/FetchUserError";

export const routes = [
  {
    path: "/user-list",
    title: "User List",
    component: UserList,
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
    path: "/paginated-user-list",
    title: "Paginated User List",
    component: PaginatedUserList,
  },
  // {
  //   path: "/cached-user",
  //   title: "Cached User",
  //   component: CachedUser,
  // },
  {
    path: "/cancel-user-query",
    title: "Cancel User Query",
    component: CancelUserQuery,
  },
];
