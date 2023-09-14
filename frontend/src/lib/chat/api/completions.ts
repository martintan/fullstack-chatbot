import axios from "axios";
import { Completion, CreateCompletionRequest } from "./interfaces";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OPENAI_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
  }
});

export const createCompletion = (req: CreateCompletionRequest) => client.post<Completion>('/completions', req);