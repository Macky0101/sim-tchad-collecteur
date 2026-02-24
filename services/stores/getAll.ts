import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ListStoresResponse } from "@/types/stores";

export const getAllStoresService = async () => {
  const { data: response } = await api.get<ListStoresResponse>(
    ENDPOINTS.stores.list,
  );
  return response;
};
