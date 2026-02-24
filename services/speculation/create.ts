import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    CreateSpeculationRequest,
    CreateSpeculationResponse,
} from "@/types/speculation";

export const createSpeculationService = async (
  data: CreateSpeculationRequest,
): Promise<CreateSpeculationResponse> => {
  const { data: response } = await api.post<CreateSpeculationResponse>(
    ENDPOINTS.speculations.create,
    data,
  );
  return response;
};
