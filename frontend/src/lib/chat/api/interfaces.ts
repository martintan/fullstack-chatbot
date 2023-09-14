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

export interface CreateCompletionRequest {
  message: string;
}
