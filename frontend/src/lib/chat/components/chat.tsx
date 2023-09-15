"use client";
import { Box, Button, Card, CardContent, CircularProgress, Container, Typography } from "@mui/material";
import { useCallback, useRef } from "react";
import { ChatMessage } from "../api";
import { useDocuments } from "../hooks/use-documents";
import { useMessages } from "../hooks/use-messages";
import { TextField } from "./text-field";
import { blue, grey } from "@mui/material/colors";
import { useQueryClient } from "react-query";

export function Chat() {
  const queryClient = useQueryClient();
  // Manage & update form state without a million re-renders
  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const messages = useMessages();
  const documents = useDocuments();

  const onSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (!formRef.current) return;

    // Set up request payload
    const formData = new FormData(formRef.current);
    const message = formData.get("prompt")?.toString() ?? "";

    // Reset field
    const textField = textFieldRef.current;
    if (textField) textField.value = "";

    messages.createMessage({ message });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    documents.uploadDocument(formData, {
      onSuccess(res) {
        queryClient.setQueryData(["messages"], (oldData?: ChatMessage[]) => (oldData ? [...oldData, res.data] : []));
      },
    });
  };

  const renderMessage = useCallback(
    (m: ChatMessage, i: number) => {
      const isUser = m.sender === "user";
      const bgcolor = isUser ? blue[800] : blue[100];
      const color = !isUser ? grey[900] : undefined;
      const alignSelf = isUser ? "flex-end" : "flex-start";
      return (
        <Card key={i} sx={{ bgcolor, alignSelf, color, padding: 2 }}>
          <Typography variant="body1">{m.message}</Typography>
        </Card>
      );
    },
    [messages.data]
  );

  return (
    <>
      <Container className="flex flex-col">
        <div className="flex flex-col grow p-2 gap-2">{messages.data?.map(renderMessage)}</div>

        {messages.isLoadingMessages ? (
          <div className="flex items-center gap-4">
            <CircularProgress />
            <span>Loading conversation...</span>
          </div>
        ) : null}

        {documents.isUploading ? (
          <div className="flex items-center gap-4">
            <CircularProgress />
            <span>Parsing document...</span>
          </div>
        ) : null}

        {messages.waitingForMessage ? (
          <div className="flex items-center gap-4">
            <CircularProgress />
            <span>Getting answer...</span>
          </div>
        ) : null}

        <Box sx={{ height: 200 }} />
      </Container>
      <div className="w-screen fixed bottom-0 py-2 bg-neutral-900">
        <form ref={formRef} onSubmit={onSubmit}>
          <Container className="flex flex-row gap-2">
            <div className="flex-grow">
              <TextField inputRef={textFieldRef} multiline type="text" name="prompt" onKeyDown={onKeyDown} />
            </div>

            <Button
              sx={{ alignSelf: "flex-end" }}
              type="submit"
              variant="contained"
              disabled={messages.waitingForMessage}
            >
              Send
            </Button>

            <Button
              sx={{ alignSelf: "flex-end" }}
              type="button"
              variant="contained"
              onClick={() => fileInputRef.current?.click()}
              disabled={documents.isUploading}
            >
              Upload
            </Button>

            <input ref={fileInputRef} className="hidden" type="file" accept=".pdf" onChange={onUpload} />
          </Container>
        </form>
      </div>
    </>
  );
}
