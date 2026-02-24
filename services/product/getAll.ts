import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ListProductsResponse } from "@/types/product";

export const getAllProductsService = async () => {
  const { data: response } = await api.get<ListProductsResponse>(
    ENDPOINTS.products.list,
  );
  return response;
};
