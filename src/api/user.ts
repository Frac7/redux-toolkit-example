// Need to use the React-specific entry point to import createApi
import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { GET_USER_MAX_CACHE_AGE_IN_SECONDS } from "app/constants";
import { Paginated } from "app/types";

export type User = {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
};

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api/users",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getUserList: builder.query<
      Paginated<User>,
      { page?: number; delay?: number } | void
    >({
      query: (params) =>
        ({
          url: "",
          params,
        } as FetchArgs),
    }),
    getUser: builder.query<User, { id: number; delay?: number }>({
      query: ({ id, ...params }) =>
        ({
          url: `/${id}`,
          params,
        } as FetchArgs),
      transformResponse: (response: { data: User }) => response.data,
      keepUnusedDataFor: GET_USER_MAX_CACHE_AGE_IN_SECONDS,
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
      query: ({ id, ...patch }: User) => ({
        url: `/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserListQuery,
  //
  useGetUserQuery,
  useLazyGetUserQuery,
  //
  useUpdateUserMutation,
  //
  endpoints: {
    getUser: { useQuerySubscription, useQueryState },
  },
  //
  usePrefetch
} = userApi;

// See https://redux-toolkit.js.org/tutorials/rtk-query/
