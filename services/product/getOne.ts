import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { GetOneProductResponse } from "@/types/product";

export const getOneProductService = async (id: number | string) => {
  const { data: response } = await api.get<GetOneProductResponse>(
    ENDPOINTS.products.getOne(id),
  );
  return response;
};
