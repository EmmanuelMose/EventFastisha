import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

export type TPayment = {
    paymentID: number;
    bookingID: number;
    userID: number;
    amount: number;
    paymentStatus: string;
    paymentDate: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
};

export const paymentsAPI = createApi({
    reducerPath: "paymentsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),

    tagTypes: ["Payments"],

    endpoints: (builder) => ({
        createPayment: builder.mutation<TPayment, Partial<TPayment>>({
            query: (newPayment) => ({
                url: "/api/payment",
                method: "POST",
                body: newPayment,
            }),
            invalidatesTags: ["Payments"],
        }),

        getPayments: builder.query<{ data: TPayment[] }, void>({
            query: () => "/api/payments",
            providesTags: ["Payments"],
        }),

        updatePayment: builder.mutation<
            TPayment,
            Partial<TPayment> & { paymentID: number }
        >({
            query: (updatedPayment) => ({
                url: `/api/payment/${updatedPayment.paymentID}`,
                method: "PUT",
                body: updatedPayment,
            }),
            invalidatesTags: ["Payments"],
        }),

        deletePayment: builder.mutation<
            { success: boolean; paymentID: number },
            number
        >({
            query: (paymentID) => ({
                url: `/api/payment/${paymentID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Payments"],
        }),

        getPaymentById: builder.query<{ data: TPayment[] }, number>({
            query: (paymentID) => `/api/payment/${paymentID}`,
            providesTags: ["Payments"],
        }),

        getPaymentByUserId: builder.query<{ data: TPayment[] }, number>({
            query: (userId) => `/api/payments/user/${userId}`,
            providesTags: ["Payments"],
        }),

        getPaymentByBookingId: builder.query<{ data: TPayment[] }, number>({
            query: (bookingID) => `/api/payments/booking/${bookingID}`,
            providesTags: ["Payments"],
        }),
    }),
});

// EXPORT HOOKS
export const {
    useCreatePaymentMutation,
    useGetPaymentsQuery,
    useUpdatePaymentMutation,
    useDeletePaymentMutation,
    useGetPaymentByIdQuery,
    useGetPaymentByUserIdQuery,
    useGetPaymentByBookingIdQuery,
} = paymentsAPI;
