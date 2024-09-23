import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from ".";

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

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    first_name: string;
    last_name: string;
    organization: string;
    email: string;
  };
}
  
  export interface DashboardMetrics {
    clients: Client[];
  }

  export interface ChatWithBotResponse {
    response: string;
  }
  
  export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Inbox", "Clients", "Projects", "Chats"],
    endpoints: (build) => ({
      login: build.mutation<LoginResponse, { email: string; password: string }>({
        query: (credentials) => ({
          url: "/login",
          method: "POST",
          body: credentials,
        }),
      }),
      signup: build.mutation<LoginResponse, {first_name: string, last_name: string, organization: string, email: string, password: string}>({
        query: ({first_name, last_name, organization, email, password}) => ({
          url: "/register",
          method: "POST",
          body: {first_name, last_name, organization, email, password},
        }),
      }),
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
      chatWithBot: build.mutation<ChatWithBotResponse, { query: string; chat_history: { sender: string; message: string }[] }>({
        query: ({ query, chat_history }) => ({
          url: "/chat_with_bot",
          method: "POST",
          body: { query, chat_history },
        }),
        invalidatesTags: ["Chats"],
      }),
    }),
  });
  
  export const {
    useGetDashboardMetricsQuery,
    useGetInboxQuery,
    useCreateClientMutation,
    useGetClientsQuery,
    useLoginMutation,
    useSignupMutation,
    useChatWithBotMutation,
  } = api;
  