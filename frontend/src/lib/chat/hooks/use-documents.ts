import { useMutation } from "react-query";
import { uploadDocument as uploadDocumentApi } from "../api";

export function useDocuments() {
  const { mutate: uploadDocument, isLoading: isUploading } = useMutation({
    mutationKey: ["upload-document"],
    mutationFn: uploadDocumentApi,
  });

  return {
    // Upload document
    uploadDocument,
    isUploading,
  };
}
