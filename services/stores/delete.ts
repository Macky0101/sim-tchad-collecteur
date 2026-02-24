import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { DeleteStoreRequest, DeleteStoreResponse } from "@/types/stores";

export const deleteStoreService = async (
  data: DeleteStoreRequest,
): Promise<DeleteStoreResponse> => {
  const { data: response } = await api.delete<DeleteStoreResponse>(
    ENDPOINTS.stores.delete(data.id),
  );
  return response;
};
