import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ListProductTypesResponse } from "@/types/productTypes";

export const getAllProductTypesService = async () => {
  const { data: response } = await api.get<ListProductTypesResponse>(
    ENDPOINTS.productTypes.list,
  );
  return response;
};
