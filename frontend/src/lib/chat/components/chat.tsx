"use client";
import { Button, Container } from "@mui/material";
import { SyntheticEvent, useRef } from "react";
import { useMutation } from "react-query";
import { ModelEnum, createCompletion as createCompletionApi } from "../api";
import { TextField } from "./text-field";

export function Chat() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const { mutate: createCompletion, isLoading: isCreatingCompletion } = useMutation({
    mutationKey: ["create-completion"],
    mutationFn: createCompletionApi,
    onSuccess(data) {
      console.log("completion response:", data);
    },
  });

  const onUpload = () => {};

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    createCompletion({
      model: ModelEnum.GPT_35_TURBO,
      prompt: formData.get("prompt")?.toString() ?? "",
    });
  };

  return (
    <>
      <Container className="flex flex-col">
        <div className="flex flex-col grow"></div>
      </Container>
      <div className="w-screen fixed bottom-0 pb-2">
        <form ref={formRef} onSubmit={onSubmit}>
          <Container className="flex flex-row gap-2">
            <div className="flex-grow">
              <TextField type="text" name="prompt" />
            </div>
            <Button type="button" variant="contained" color="primary" onClick={onUpload}>
              Upload
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={isCreatingCompletion}>
              Send
            </Button>
          </Container>
        </form>
      </div>
    </>
  );
}
