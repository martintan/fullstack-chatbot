import { BACKEND_API_BASE_URL, WS_PROCOTOL } from "@/lib/environment";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import useWebSocket from "react-use-websocket";
import { ChatMessage, CreateMessageRequest, WebSocketMessageResponse, getMessages } from "../api";

const backendOrigin = BACKEND_API_BASE_URL?.replace(/(^\w+:|^)\/\//, "") ?? "";
const wsUrl = `${WS_PROCOTOL}://${backendOrigin}/messages/ws`;

export function useMessages() {
  const queryClient = useQueryClient();
  const [waitingForMessage, setWaitingForMessage] = useState(false);

  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages({ sender: "test" }).then((res) => res.data),
  });

  const { sendMessage } = useWebSocket(wsUrl, {
    onMessage(event: MessageEvent<string>) {
      setWaitingForMessage(false);
      try {
        const message = JSON.parse(event.data) as WebSocketMessageResponse;
        console.log("Received message:", message);
        // Optimistic update to avoid refetching everything
        queryClient.setQueryData(["messages"], (oldData?: ChatMessage[]) =>
          oldData ? [...oldData, ...message.messages] : []
        );
      } catch (err) {
        console.error(err);
      }
    },
  });

  const createMessage = (req: CreateMessageRequest) => {
    setWaitingForMessage(true);
    sendMessage(JSON.stringify(req));
  };

  return {
    // Get messages
    data: messages,
    isLoadingMessages,
    // Create message
    createMessage,
    waitingForMessage,
  };
}
