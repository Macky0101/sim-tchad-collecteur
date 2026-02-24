import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { GetOneActorResponse } from "@/types/actors";

export const GetActorByIdService = async (id: string) => {
  const { data: response } = await api.get<GetOneActorResponse>(
    ENDPOINTS.actors.getOne(id),
  );
  return response;
};
