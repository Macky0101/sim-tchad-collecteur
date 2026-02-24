import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ListProductionAreasResponse } from "@/types/production_areas";

export const getAllProductionAreasService = async () => {
  const { data: response } = await api.get<ListProductionAreasResponse>(
    ENDPOINTS.productionAreas.list,
  );
  return response;
};
