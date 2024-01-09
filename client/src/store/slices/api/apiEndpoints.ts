import { apiSlice } from "./apiSlice";

type user = { name: string, email: string, token: 'string', role: string }
type luser = { email: string, password: string };

export const appApiEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<user,luser>({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useLoginMutation
} = appApiEndpoints;
