import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";

// Type for the user object returned by login
export type TUser = {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  contactPhone: string;
  address: string;
  role: string;
  image_url: string;
};

// Type for the login response
export type TLoginResponse = {
  token: string;
  user: TUser;
};

// Type for the login request payload
export type TLoginInputs = {
  email: string;
  password: string;
};

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ["Login"],
  endpoints: (builder) => ({
    loginUser: builder.mutation<TLoginResponse, TLoginInputs>({
      query: (loginData) => ({
        url: "/api/user/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["Login"],
    }),
  }),
});

// Export the hook for using this mutation in components
export const { useLoginUserMutation } = loginAPI;
