import axios from "axios";
import { Completion, CreateCompletionRequest } from "./interfaces";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const createCompletion = (req: CreateCompletionRequest) => client.post<Completion>("/completion", req);
