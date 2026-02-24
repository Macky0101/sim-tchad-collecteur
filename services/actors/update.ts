import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { UpdateActorRequest, UpdateActorResponse } from "@/types/actors";

export const UpdateActorService = async (
  data: UpdateActorRequest,
): Promise<UpdateActorResponse> => {
  const { data: response } = await api.put<UpdateActorResponse>(
    ENDPOINTS.actors.update(data.id),
    data,
  );
  return response;
};
