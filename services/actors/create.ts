import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { CreateActorRequest, CreateActorResponse } from "@/types/actors";

export const createActorService = async (
  data: CreateActorRequest,
): Promise<CreateActorResponse> => {
  const { data: response } = await api.post<CreateActorResponse>(
    ENDPOINTS.actors.create,
    data,
  );
  return response;
};
