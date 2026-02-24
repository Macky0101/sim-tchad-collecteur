import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    DeleteSpeculationRequest,
    DeleteSpeculationResponse,
} from "@/types/speculation";

export const deleteSpeculationService = async (
  data: DeleteSpeculationRequest,
): Promise<DeleteSpeculationResponse> => {
  const { data: response } = await api.delete<DeleteSpeculationResponse>(
    ENDPOINTS.speculations.delete(data.id),
  );
  return response;
};
