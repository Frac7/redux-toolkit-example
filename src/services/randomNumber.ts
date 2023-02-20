// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RandomNumber } from "./types";

// Define a service using a base URL and expected endpoints
export const randomNumberApi = createApi({
  reducerPath: "randomNumberApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://www.randomnumberapi.com/api/v1.0/" }),
  endpoints: (builder) => ({
    getRandomNumber: builder.query<RandomNumber, void>({
      query: () => 'random',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRandomNumberQuery } = randomNumberApi;

// See https://redux-toolkit.js.org/tutorials/rtk-query/
