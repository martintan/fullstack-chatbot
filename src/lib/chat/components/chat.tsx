"use client";
import { Box, Button, Container } from "@mui/material";
import { useState } from "react";
import { TextField } from "./text-field";

export function Chat() {
  const [message, setMessage] = useState("");

  const onUpload = () => {};

  const onSend = () => {};

  return (
    <>
      <Container className="flex flex-col">
        <div className="flex flex-col grow"></div>
      </Container>
      <div className="w-screen fixed bottom-0 pb-2">
        <Container className="flex flex-row gap-2">
          <div className="flex-grow">
            <TextField />
          </div>
          <Button variant="contained" color="primary" onClick={onUpload}>
            Upload
          </Button>
          <Button variant="contained" color="primary" onClick={onSend}>
            Send
          </Button>
        </Container>
      </div>
    </>
  );
}
