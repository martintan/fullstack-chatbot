import { FinishReasonEnum, ModelEnum } from "./enums";

export interface Completion {
  id: string;
  object: "text_completion";
  created: number;
  model: ModelEnum;
  choices: Choice[];
  usage: UsageStatistics;
}

export interface Choice {
  text: string;
  index: number;
  logprobs: object | null;
  finish_reason: FinishReasonEnum;
}

export interface UsageStatistics {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ChatMessage {
  id: number;
  session_id: string;
  message: string;
  sender: string;
  tokens: number;
  timestamp: string;
}

export interface CreateMessageRequest {
  message: string;
}

export interface GetMessagesRequest {
  sender: string;
}

export interface WebSocketMessageResponse {
  messages: ChatMessage[];
}
