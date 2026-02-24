import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { GetOneSettingsResponse } from "@/types/settings";

export const getOneSettingsService = async (id: number) => {
  const { data: response } = await api.get<GetOneSettingsResponse>(
    ENDPOINTS.settings.getOne(id),
  );
  return response;
};
