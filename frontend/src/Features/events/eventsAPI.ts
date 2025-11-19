import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

export type TEvent = {
    eventID: number;
    title: string;
    description: string;
    category: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    ticketPrice: number;
    totalTickets: number;
    availableTickets: number;
    isActive: boolean;
    image_url: string;
    venueID: number;
    createdAt: string;
    updatedAt: string;
};

export const eventsAPI = createApi({
    reducerPath: 'eventsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            // fix for Vercel TS build
            const state = getState() as RootState & { user?: { token?: string } };
            const token = state.user?.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['Events'],
    endpoints: (builder) => ({
        createEvent: builder.mutation<TEvent, Partial<TEvent>>({
            query: (newEvent) => ({
                url: '/api/event',
                method: 'POST',
                body: newEvent
            }),
            invalidatesTags: ['Events']
        }),
        getEvents: builder.query<{ data: TEvent[] }, void>({
            query: () => '/api/events',
            providesTags: ['Events']
        }),
        updateEvent: builder.mutation<TEvent, Partial<TEvent> & { eventID: number }>({
            query: (updatedEvent) => ({
                url: `/api/event/${updatedEvent.eventID}`,
                method: 'PUT',
                body: updatedEvent
            }),
            invalidatesTags: ['Events']
        }),
        deleteEvent: builder.mutation<{ success: boolean; eventID: number }, number>({
            query: (eventID) => ({
                url: `/api/event/${eventID}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Events']
        }),
        getEventById: builder.query<{ data: TEvent[] }, number>({
            query: (eventID) => `/api/event/${eventID}`,
            providesTags: ['Events']
        }),
    })
});

export const {
    useCreateEventMutation,
    useGetEventsQuery,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useGetEventByIdQuery
} = eventsAPI;
