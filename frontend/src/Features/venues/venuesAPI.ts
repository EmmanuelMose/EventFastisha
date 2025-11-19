import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

export type TVenue = {
    venueID: number;
    name: string;
    address: string;
    capacity: number;
    contactNumber: string;
    createdAt: string;
};

export const venuesAPI = createApi({
    reducerPath: "venuesAPI",

    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),

    tagTypes: ["Venues"],

    endpoints: (builder) => ({
        // ------------------------------
        // CREATE VENUE
        // ------------------------------
        createVenue: builder.mutation<TVenue, Partial<TVenue>>({
            query: (newVenue) => ({
                url: "/api/venue",
                method: "POST",
                body: newVenue,
            }),
            invalidatesTags: ["Venues"],
        }),

        // ------------------------------
        // GET ALL VENUES
        // ------------------------------
        getVenues: builder.query<TVenue[], void>({
            query: () => "/api/venues",
            transformResponse: (response: { data: TVenue[] }) => response.data,
            providesTags: ["Venues"],
        }),

        // ------------------------------
        // UPDATE VENUE
        // ------------------------------
        updateVenue: builder.mutation<TVenue, Partial<TVenue> & { venueID: number }>({
            query: (venue) => ({
                url: `/api/venue/${venue.venueID}`,
                method: "PUT",
                body: venue,
            }),
            invalidatesTags: ["Venues"],
        }),

        // ------------------------------
        // DELETE VENUE
        // ------------------------------
        deleteVenue: builder.mutation<{ success: boolean; venueID: number }, number>({
            query: (venueID) => ({
                url: `/api/venue/${venueID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Venues"],
        }),

        // ------------------------------
        // GET VENUE BY ID
        // ------------------------------
        getVenueById: builder.query<TVenue, number>({
            query: (venueID) => `/api/venue/${venueID}`,
            transformResponse: (response: { data: TVenue }) => response.data,
            providesTags: ["Venues"],
        }),
    }),
});

export const {
    useCreateVenueMutation,
    useGetVenuesQuery,
    useUpdateVenueMutation,
    useDeleteVenueMutation,
    useGetVenueByIdQuery,
} = venuesAPI;
