import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

export type TBooking = {
    bookingID: number;
    userID: number;
    eventID: number;
    numberOfTickets: number;
    totalAmount: string;
    bookingDate: string;
    bookingStatus: string;
    createdAt: string;
    updatedAt: string;
};

export const bookingsAPI = createApi({
    reducerPath: 'bookingsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            // fix TS error on Vercel
            const state = getState() as RootState & { user?: { token?: string } };
            const token = state.user?.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['Bookings'],
    endpoints: (builder) => ({
        createBooking: builder.mutation<{ booking: TBooking }, Partial<TBooking>>({
            query: (newBooking) => ({
                url: '/api/booking',
                method: 'POST',
                body: newBooking
            }),
            invalidatesTags: ['Bookings']
        }),
        getBookings: builder.query<{ data: TBooking[] }, void>({
            query: () => '/api/bookings',
            providesTags: ['Bookings']
        }),
        updateBooking: builder.mutation<TBooking, Partial<TBooking> & { bookingID: number }>({
            query: (updatedBooking) => ({
                url: `/api/booking/${updatedBooking.bookingID}`,
                method: 'PUT',
                body: updatedBooking
            }),
            invalidatesTags: ['Bookings']
        }),
        deleteBooking: builder.mutation<{ success: boolean; bookingID: number }, number>({
            query: (bookingID) => ({
                url: `/api/booking/${bookingID}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Bookings']
        }),
        getBookingById: builder.query<{ data: TBooking }, number>({
            query: (bookingID) => `/api/booking/${bookingID}`,
            providesTags: ['Bookings']
        }),
        getBookingsByUserId: builder.query<{ data: TBooking[] }, number>({
            query: (userId) => `/api/bookings/user/${userId}`,
            providesTags: ['Bookings']
        }),
    })
});

export const {
    useCreateBookingMutation,
    useGetBookingsQuery,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
    useGetBookingByIdQuery,
    useGetBookingsByUserIdQuery
} = bookingsAPI;
