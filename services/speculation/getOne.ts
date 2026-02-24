import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    GetOneSpeculationResponse
} from "@/types/speculation";

export const getOneSpeculationService = async (id: number) => {
  const { data: response } = await api.get<GetOneSpeculationResponse>(
    ENDPOINTS.speculations.getOne(id),
  );
  return response;
};
