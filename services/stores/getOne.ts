import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { GetOneStoreResponse } from "@/types/stores";

export const getOneStoreService = async (id: number) => {
  const { data: response } = await api.get<GetOneStoreResponse>(
    ENDPOINTS.stores.getOne(id),
  );
  return response;
};
