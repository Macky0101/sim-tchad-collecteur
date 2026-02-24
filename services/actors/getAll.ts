import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ListActorsResponse } from "@/types/actors";

export const GetActorsService = async (): Promise<ListActorsResponse> => {
  const { data: response } = await api.get<ListActorsResponse>(
    ENDPOINTS.actors.list,
  );
  return response;
};
