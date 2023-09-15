import { BACKEND_API_BASE_URL } from "@/lib/environment";
import axios from "axios";
import { ChatMessage, CreateMessageRequest, GetMessagesRequest } from "./interfaces";

const client = axios.create({
  baseURL: BACKEND_API_BASE_URL,
  headers: {
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const createMessage = (req: CreateMessageRequest) => client.post<ChatMessage>("/messages", req);

export const getMessages = (params: GetMessagesRequest) => client.get<ChatMessage[]>("/messages", { params });

export const uploadDocument = (formData: FormData) =>
  client.post<ChatMessage>("/documents", formData, {
    headers: { "Content-Type": "application/form-data" },
  });
