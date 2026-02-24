import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { DeleteSectorResponse } from "@/types/sectors";

export const deleteSectorService = async (id: string) => {
  const { data: response } = await api.delete<DeleteSectorResponse>(
    ENDPOINTS.sectors.delete(id),
  );
  return response;
};
