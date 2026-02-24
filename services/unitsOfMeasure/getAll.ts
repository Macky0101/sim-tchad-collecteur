import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { GetAllUnitsOfMeasureResponse } from "@/types/unitsOfMeasure";

export const getAllUnitsOfMeasureService = async () => {
  const { data: response } = await api.get<GetAllUnitsOfMeasureResponse>(
    ENDPOINTS.unitsOfMeasure.list,
  );
  return response;
};
