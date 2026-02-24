import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    CreateProductionAreaRequest,
    CreateProductionAreaResponse,
} from "@/types/production_areas";

export const createProductionAreaService = async (
  data: CreateProductionAreaRequest,
): Promise<CreateProductionAreaResponse> => {
  const { data: response } = await api.post<CreateProductionAreaResponse>(
    ENDPOINTS.productionAreas.create,
    data,
  );
  return response;
};
