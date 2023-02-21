import UserList from "features/UserList";
import InfiniteUserList from "features/InfiniteUserList";
import CachedUser from "features/CachedUser";
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
    path: "/infinite-user-list",
    title: "Infinite User List",
    component: InfiniteUserList,
  },
  {
    path: "/cached-user",
    title: "Cached User",
    component: CachedUser,
  },
  {
    path: "/cancel-user-query",
    title: "Cancel User Query",
    component: CancelUserQuery,
  },
  {
    path: "/user-mutation",
    title: "User Mutation",
    component: UserMutation,
  },
  {
    path: "/fetch-user-error",
    title: "Fetch User Error",
    component: FetchUserError,
  },
];
