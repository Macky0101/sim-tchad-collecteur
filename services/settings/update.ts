import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    UpdateSettingsRequest,
    UpdateSettingsResponse,
} from "@/types/settings";

export const updateSettingsService = async (
  data: UpdateSettingsRequest,
): Promise<UpdateSettingsResponse> => {
  const { data: response } = await api.put<UpdateSettingsResponse>(
    ENDPOINTS.settings.update(data.id),
    data,
  );
  return response;
};
