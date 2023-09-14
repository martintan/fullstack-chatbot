import { FinishReasonEnum, ModelEnum } from "./enums";

export interface Completion {
  id: string;
  object: 'text_completion';
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
  model: ModelEnum;
  prompt: string | string[] | string[][];
  suffix?: string | null;
  max_tokens?: number | null;
  temperature?: number | null;
  top_p?: number | null;
  // How many completions to generate for each prompt
  n?: number | null;
  stream?: boolean | null;
  logprobs?: boolean | null;
  echo?: boolean | null;
  stop?: string | string[] | null;
  prescence_penalty?: number | null;
  frequency_penalty?: number | null;
  best_of?: number | null;
  logit_bias?: object | null;
  user?: string | null;
}