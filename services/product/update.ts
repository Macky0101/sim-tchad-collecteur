import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { UpdateProductRequest } from "@/types/product";

export const updateProductService = async (data: UpdateProductRequest) => {
  const { id, ...payload } = data;
  const { data: response } = await api.put(
    ENDPOINTS.products.update(id),
    payload,
  );
  return response;
};
