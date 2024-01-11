import { apiSlice } from "./apiSlice";
import { user, luser, afiliate, lafiliate, school, lschool, schoolUpdate } from "../types";

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
        url: credentials.id ? `user/affiliates/${credentials.id}` : "user/affiliates/",
        
      })
    }),
    createUser: builder.mutation<lschool, afiliate>({
      query: (credentials) => ({
        url: "user/register",
        method: "POST",
        body: { ...credentials },
      })
    }),
    createSchool: builder.mutation<lschool, school>({
      query: (credentials) => ({
        url: "user/schools",
        method: "POST",
        body: { ...credentials },
      })
    }),
    getSchools: builder.query<school[], lafiliate>({
      query: (credentials) => ({
        url: credentials.id ? `user/schools/${credentials.id}` : "user/schools/",
      })
    }),
    updateSchool: builder.mutation<lschool, schoolUpdate>({
      query: (credentials) => ({
        url: `user/schools/${credentials.id}`,
        method: "PUT",
        body: {...credentials}
      })
    })
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
  useGetSchoolsQuery,
  useCreateUserMutation,
} = appApiEndpoints;
