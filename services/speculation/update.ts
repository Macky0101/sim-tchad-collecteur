import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    UpdateSpeculationRequest,
    UpdateSpeculationResponse,
} from "@/types/speculation";

export const updateSpeculationService = async (
  data: UpdateSpeculationRequest,
): Promise<UpdateSpeculationResponse> => {
  const { data: response } = await api.put<UpdateSpeculationResponse>(
    ENDPOINTS.speculations.update(data.id),
    data,
  );
  return response;
};
