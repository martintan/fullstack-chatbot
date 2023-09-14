import { useMutation, useQuery } from "react-query";
import { createMessage as createMessageApi, getMessages } from "../api";

export function useMessages() {
  const {
    data: data,
    isLoading: isLoadingMessages,
    refetch,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages({ sender: "test" }),
    select: (res) => res.data,
  });

  const { mutate: createMessage, isLoading: isCreating } = useMutation({
    mutationKey: ["create-message"],
    mutationFn: createMessageApi,
    onSuccess(data) {
      console.log("create message response:", data);
      refetch();
    },
  });

  return {
    // Get messages
    data,
    isLoadingMessages,
    // Create message
    createMessage,
    isCreating,
  };
}
