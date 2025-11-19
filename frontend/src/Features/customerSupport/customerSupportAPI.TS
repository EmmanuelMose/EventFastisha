import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

export type TCustomerSupport = {
    ticketID: number;
    userID: number;
    email: string;
    subject: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export const customerSupportAPI = createApi({
    reducerPath: "customerSupportAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user?.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),

    tagTypes: ["CustomerSupport"],

    endpoints: (builder) => ({
        // CREATE SUPPORT TICKET
        createSupportTicket: builder.mutation<TCustomerSupport, Partial<TCustomerSupport>>({
            query: (newTicket) => ({
                url: "/api/ticket",
                method: "POST",
                body: newTicket,
            }),
            invalidatesTags: ["CustomerSupport"],
        }),

        // GET ALL SUPPORT TICKETS
        getSupportTickets: builder.query<{ data: TCustomerSupport[] }, void>({
            query: () => "/api/tickets",
            providesTags: ["CustomerSupport"],
        }),

        // UPDATE SUPPORT TICKET STATUS OR CONTENT
        updateSupportTicket: builder.mutation<
            TCustomerSupport,
            Partial<TCustomerSupport> & { ticketID: number }
        >({
            query: (updatedTicket) => ({
                url: `/api/ticket/${updatedTicket.ticketID}`,
                method: "PUT",
                body: updatedTicket,
            }),
            invalidatesTags: ["CustomerSupport"],
        }),

        // DELETE SUPPORT TICKET
        deleteSupportTicket: builder.mutation<
            { success: boolean; ticketID: number },
            number
        >({
            query: (ticketID) => ({
                url: `/api/ticket/${ticketID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CustomerSupport"],
        }),

        // GET TICKET BY ID
        getSupportTicketById: builder.query<{ data: TCustomerSupport[] }, number>({
            query: (ticketID) => `/api/ticket/${ticketID}`,
            providesTags: ["CustomerSupport"],
        }),

        // GET TICKETS BY USER ID
        getSupportTicketsByUserId: builder.query<
            { data: TCustomerSupport[] },
            number
        >({
            query: (userId) => `/api/tickets/user/${userId}`,
            providesTags: ["CustomerSupport"],
        }),
    }),
});

// 👇 EXPORT HOOKS
export const {
    useCreateSupportTicketMutation,
    useGetSupportTicketsQuery,
    useUpdateSupportTicketMutation,
    useDeleteSupportTicketMutation,
    useGetSupportTicketByIdQuery,
    useGetSupportTicketsByUserIdQuery,
} = customerSupportAPI;
