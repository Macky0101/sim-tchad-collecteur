import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { GetProductWithAttributesResponse } from "@/types/product";

export const getProductsByTypeService = async (typeId: number | string) => {
  const { data: response } = await api.get<GetProductWithAttributesResponse>(
    ENDPOINTS.products.byTypeWithAttributes(typeId),
  );
  return response;
};
