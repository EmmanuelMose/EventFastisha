import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

export type TUser = {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contactPhone: string;
    address: string;
    role: string;
    isVerified: string;
    image_url?: string;
    createdAt: string;
    updatedAt: string;
};

export const userAPI = createApi({
    reducerPath: "userAPI",

    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),

    tagTypes: ["Users"],

    endpoints: (builder) => ({
        // ------------------------------
        // CREATE USER (REGISTER)
        // ------------------------------
        createUser: builder.mutation<TUser, Partial<TUser>>({
            query: (newUser) => ({
                url: "/api/user",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["Users"],
        }),

        // ------------------------------
        // VERIFY USER (CODE VERIFICATION)
        // ------------------------------
        verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
            query: (data) => ({
                url: "/api/user/verify",
                method: "POST",
                body: data,
            }),
        }),

        // ------------------------------
        // GET ALL USERS
        // ------------------------------
        getUsers: builder.query<TUser[], void>({
            query: () => "/api/users",
            transformResponse: (response: { data: TUser[] }) => response.data,
            providesTags: ["Users"],
        }),

        // ------------------------------
        // UPDATE USER
        // ------------------------------
        updateUser: builder.mutation<TUser, Partial<TUser> & { userID: number }>({
            query: (user) => ({
                url: `/api/user/${user.userID}`,
                method: "PUT",
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),

        // ------------------------------
        // DELETE USER
        // ------------------------------
        deleteUsers: builder.mutation<{ success: boolean; userID: number }, number>({
            query: (userID) => ({
                url: `/api/user/${userID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),

        // ------------------------------
        // GET USER BY ID
        // ------------------------------
        getUserById: builder.query<TUser, number>({
            query: (userID) => `/api/user/${userID}`,
            transformResponse: (response: { data: TUser }) => response.data,
            providesTags: ["Users"],
        }),
    }),
});

export const {
    useCreateUserMutation,
    useVerifyUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUsersMutation,
    useGetUserByIdQuery,
} = userAPI;
