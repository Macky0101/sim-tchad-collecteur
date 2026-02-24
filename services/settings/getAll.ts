import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { GetAllSettingsResponse } from "@/types/settings";

export const getAllSettingsService = async () => {
  const { data: response } = await api.get<GetAllSettingsResponse>(
    ENDPOINTS.settings.list,
  );
  return response;
};
