import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { GetOneProductionAreaResponse } from "@/types/production_areas";

export const getOneProductionAreaService = async (id: number) => {
  const { data: response } = await api.get<GetOneProductionAreaResponse>(
    ENDPOINTS.productionAreas.getOne(id),
  );
  return response;
};
