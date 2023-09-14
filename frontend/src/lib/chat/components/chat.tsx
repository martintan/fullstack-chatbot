"use client";
import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useCallback, useRef } from "react";
import { TextField } from "./text-field";
import { useMessages } from "../hooks/use-messages";
import { ChatMessage } from "../api";

export function Chat() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const messages = useMessages();

  const onUpload = () => {};

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const message = formData.get("prompt")?.toString() ?? "";
    messages.createMessage({ message });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key == "Enter") {
      formRef.current?.submit();
    }
  };

  const renderMessage = useCallback(
    (m: ChatMessage, i: number) => (
      <Card key={i}>
        <CardContent>
          <Typography variant="body1">{m.message}</Typography>
        </CardContent>
      </Card>
    ),
    [messages.data]
  );

  return (
    <>
      <Container className="flex flex-col">
        <div className="flex flex-col grow p-2">{messages.data?.map(renderMessage)}</div>
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
            <Button sx={{ alignSelf: "flex-end" }} type="submit" variant="contained" disabled={messages.isCreating}>
              Send
            </Button>
          </Container>
        </form>
      </div>
    </>
  );
}
