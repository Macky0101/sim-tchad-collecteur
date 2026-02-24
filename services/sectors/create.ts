import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { CreateSectorRequest, CreateSectorResponse } from "@/types/sectors";

export const createSectorService = async (
  data: CreateSectorRequest,
): Promise<CreateSectorResponse> => {
  const { data: response } = await api.post<CreateSectorResponse>(
    ENDPOINTS.sectors.create,
    data,
  );
  return response;
};
