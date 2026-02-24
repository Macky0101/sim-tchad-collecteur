import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { CreateStoreRequest, CreateStoreResponse } from "@/types/stores";

export const createStoreService = async (
  data: CreateStoreRequest,
): Promise<CreateStoreResponse> => {
  const { data: response } = await api.post<CreateStoreResponse>(
    ENDPOINTS.stores.create,
    data,
  );
  return response;
};
