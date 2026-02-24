import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { UpdateStoreRequest, UpdateStoreResponse } from "@/types/stores";

export const updateStoreService = async (
  data: UpdateStoreRequest,
): Promise<UpdateStoreResponse> => {
  const { data: response } = await api.put<UpdateStoreResponse>(
    ENDPOINTS.stores.update(data.id),
    data,
  );
  return response;
};
