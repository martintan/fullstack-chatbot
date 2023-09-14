"use client";
import { Button, Container } from "@mui/material";
import { useRef } from "react";
import { useMutation } from "react-query";
import { createCompletion as createCompletionApi } from "../api";
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

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const message = formData.get("prompt")?.toString() ?? "";
    createCompletion({ message });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key == "Enter") {
      formRef.current?.submit();
    }
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
              <TextField multiline type="text" name="prompt" onKeyDown={onKeyDown} />
            </div>
            <Button sx={{ alignSelf: "flex-end" }} type="button" variant="contained" onClick={onUpload}>
              Upload
            </Button>
            <Button sx={{ alignSelf: "flex-end" }} type="submit" variant="contained" disabled={isCreatingCompletion}>
              Send
            </Button>
          </Container>
        </form>
      </div>
    </>
  );
}
