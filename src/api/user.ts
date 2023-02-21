// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  endpoints: (builder) => ({
    getUserList: builder.query<User[], void>({
      query: () => "/",
      transformResponse: (response: { data: User[] }) => response.data,
    }),
    getUser: builder.query<User, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserListQuery, useGetUserQuery } = userApi;

// See https://redux-toolkit.js.org/tutorials/rtk-query/
