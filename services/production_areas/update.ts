import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    UpdateProductionAreaRequest,
    UpdateProductionAreaResponse,
} from "@/types/production_areas";

export const updateProductionAreaService = async (
  data: UpdateProductionAreaRequest,
): Promise<UpdateProductionAreaResponse> => {
  const { data: response } = await api.put<UpdateProductionAreaResponse>(
    ENDPOINTS.productionAreas.update(data.id),
    data,
  );
  return response;
};
