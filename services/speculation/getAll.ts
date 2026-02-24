import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ListSpeculationsResponse } from "@/types/speculation";

export const getAllSpeculationsService = async () => {
  const { data: response } = await api.get<ListSpeculationsResponse>(
    ENDPOINTS.speculations.list,
  );
  return response;
};
