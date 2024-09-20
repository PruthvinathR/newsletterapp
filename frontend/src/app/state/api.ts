import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface InboxItem {
    inboxItemId: string;
    title: string;
    description: string;
    date: string;
}
  
export interface Client {
    clientId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface NewClient {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface Project {
    projectId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
}
  
  
  export interface DashboardMetrics {
    clients: Client[];
  }
  
  export interface User {
    userId: string;
    name: string;
    email: string;
  }
  
  export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Inbox", "Clients", "Projects"],
    endpoints: (build) => ({
      getDashboardMetrics: build.query<DashboardMetrics, void>({
        query: () => "/dashboard",
        providesTags: ["DashboardMetrics"],
      }),
      getInbox: build.query<InboxItem[], string | void>({
        query: (search) => ({
          url: "/inbox",
          params: search ? { search } : {},
        }),
        providesTags: ["Inbox"],
      }),
      createClient: build.mutation<Client, NewClient>({
        query: (newClient) => ({
          url: "/clients",
          method: "POST",
          body: newClient,
        }),
        invalidatesTags: ["Clients"],
      }),
      getClients: build.query<Client[], void>({
        query: () => "/clients",
        providesTags: ["Clients"],
      }),
    }),
  });
  
  export const {
    useGetDashboardMetricsQuery,
    useGetInboxQuery,
    useCreateClientMutation,
    useGetClientsQuery,
  } = api;
  