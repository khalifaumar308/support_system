import { apiSlice } from "./apiSlice";
import { user, luser, afiliate, lafiliate } from "../types";

export const appApiEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<user,luser>({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getUsers: builder.query<afiliate, lafiliate>({
      query: (credentials) => ({
        url: credentials ? `user/affiliates/${credentials.id}` : "user/affiliates/",
        
      })
    })
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
} = appApiEndpoints;
