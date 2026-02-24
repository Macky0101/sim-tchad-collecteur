import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    CreateSettingsRequest,
    CreateSettingsResponse,
} from "@/types/settings";

export const createSettingsService = async (
  data: CreateSettingsRequest,
): Promise<CreateSettingsResponse> => {
  const { data: response } = await api.post<CreateSettingsResponse>(
    ENDPOINTS.settings.create,
    data,
  );
  return response;
};
