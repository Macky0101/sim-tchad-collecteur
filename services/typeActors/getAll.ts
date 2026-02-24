import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ListTypeActorsResponse } from "@/types/typeActor";

export const GetTypeActorsService = async () => {
  const { data: response } = await api.get<ListTypeActorsResponse>(
    ENDPOINTS.actorTypes.list,
  );
  return response;
};
