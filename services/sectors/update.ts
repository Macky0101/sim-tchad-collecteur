import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { UpdateSectorRequest, UpdateSectorResponse } from "@/types/sectors";

export const updateSectorService = async (data: UpdateSectorRequest) => {
  const { data: response } = await api.put<UpdateSectorResponse>(
    ENDPOINTS.sectors.update(data.id),
    data,
  );
  return response;
};
