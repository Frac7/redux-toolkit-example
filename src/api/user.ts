// Need to use the React-specific entry point to import createApi
import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { GET_USER_MAX_CACHE_AGE_IN_SECONDS } from "app/constants";
import { User, Paginated } from "app/types";
import { GET_USER_ENDPOINT_NAME } from "features/UserPrefetch/constants";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api/users",
  }),
  keepUnusedDataFor: 30, // See https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#manipulating-cache-behavior
  tagTypes: ["User"],
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
      providesTags: ["User"],
      transformResponse: (response: { data: User }) => response.data,
      keepUnusedDataFor: GET_USER_MAX_CACHE_AGE_IN_SECONDS, // See https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#manipulating-cache-behavior
    }),
    //
    getUserWithSSE: builder.query<User, { id: number; delay?: number }>({
      query: ({ id, ...params }) =>
        ({
          url: `/${id}`,
          params,
        } as FetchArgs),
      providesTags: ["User"],
      transformResponse: (response: { data: User }) => response.data,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create an event source connection when the cache subscription starts
        const eventSource = new EventSource("http://127.0.0.1:8080/user");
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the connection to the server,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);

            updateCachedData((draft) => {
              draft.score = data.score;
            });
          };

          eventSource.onmessage = listener;
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        eventSource.close();
      },
    }),
    //
    updateUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
      query: ({ id, ...patch }: User) => ({
        url: `/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    //
    optimisticUpdateUser: builder.mutation<
      User,
      Partial<User> & Pick<User, "id">
    >({
      query: ({ id, ...patch }: User) => ({
        url: `/${id}`,
        method: "PATCH",
        body: patch,
      }),
      // invalidatesTags: ["User"], // Useful when the mutation does not return the update and a new GET call is necessary
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData(
            GET_USER_ENDPOINT_NAME,
            { id },
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Try to turn off the network to test this
          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['User']))
           */
        }
      },
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
  useGetUserWithSSEQuery,
  //
  useUpdateUserMutation,
  useOptimisticUpdateUserMutation,
  //
  endpoints: {
    getUser: { useQuerySubscription, useQueryState },
  },
  //
  usePrefetch,
} = userApi;

// See https://redux-toolkit.js.org/tutorials/rtk-query/
