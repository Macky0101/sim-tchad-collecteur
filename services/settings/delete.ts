import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    DeleteSettingsRequest,
    DeleteSettingsResponse,
} from "@/types/settings";

export const deleteSettingsService = async (
  data: DeleteSettingsRequest,
): Promise<DeleteSettingsResponse> => {
  const { data: response } = await api.delete<DeleteSettingsResponse>(
    ENDPOINTS.settings.delete(data.id),
  );
  return response;
};
