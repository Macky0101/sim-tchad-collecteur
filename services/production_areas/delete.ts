import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    DeleteProductionAreaResponse
} from "@/types/production_areas";

export const deleteProductionAreaService = async (
  id: number,
): Promise<DeleteProductionAreaResponse> => {
  const { data: response } = await api.delete<DeleteProductionAreaResponse>(
    ENDPOINTS.productionAreas.delete(id),
  );
  return response;
};
