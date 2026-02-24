import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { GetOneSectorResponse } from "@/types/sectors";

export const getOneSectorService = async (id: string) => {
  const { data: response } = await api.get<GetOneSectorResponse>(
    ENDPOINTS.sectors.getOne(id),
  );
  return response;
};
