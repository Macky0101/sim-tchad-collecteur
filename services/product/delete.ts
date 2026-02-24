import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";

export const deleteProductService = async (id: number | string) => {
  const { data: response } = await api.delete(ENDPOINTS.products.delete(id));
  return response;
};
