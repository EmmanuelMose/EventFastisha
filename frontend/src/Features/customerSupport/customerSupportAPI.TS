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
    reducerPath: 'customerSupportAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            // Fix TS error on Vercel
            const state = getState() as RootState & { user?: { token?: string } };
            const token = state.user?.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['CustomerSupport'],
    endpoints: (builder) => ({
        createSupportTicket: builder.mutation<TCustomerSupport, Partial<TCustomerSupport>>({
            query: (newSupportTicket) => ({
                url: '/api/ticket',
                method: 'POST',
                body: newSupportTicket
            }),
            invalidatesTags: ['CustomerSupport']
        }),
        getSupportTickets: builder.query<{ data: TCustomerSupport[] }, void>({
            query: () => '/api/tickets',
            providesTags: ['CustomerSupport']
        }),
        updateSupportTicket: builder.mutation<TCustomerSupport, Partial<TCustomerSupport> & { ticketID: number }>({
            query: (updatedSupportTicket) => ({
                url: `/api/ticket/${updatedSupportTicket.ticketID}`,
                method: 'PUT',
                body: updatedSupportTicket
            }),
            invalidatesTags: ['CustomerSupport']
        }),
        deleteSupportTicket: builder.mutation<{ success: boolean; ticketID: number }, number>({
            query: (ticketID) => ({
                url: `/api/ticket/${ticketID}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['CustomerSupport']
        }),
        getSupportTicketById: builder.query<{ data: TCustomerSupport[] }, number>({
            query: (ticketID) => `/api/ticket/${ticketID}`,
            providesTags: ['CustomerSupport']
        }),
        getSupportTicketsByUserId: builder.query<{ data: TCustomerSupport[] }, number>({
            query: (userId) => `/api/tickets/user/${userId}`,
            providesTags: ['CustomerSupport']
        }),
    })
});

export const {
    useCreateSupportTicketMutation,
    useGetSupportTicketsQuery,
    useUpdateSupportTicketMutation,
    useDeleteSupportTicketMutation,
    useGetSupportTicketByIdQuery,
    useGetSupportTicketsByUserIdQuery
} = customerSupportAPI;
