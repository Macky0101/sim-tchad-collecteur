import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ProductNamesByStoreResponse } from "@/types/product";

export const getProductNamesByStoreService = async (
  storeId: number | string,
) => {
  const { data: response } = await api.get<ProductNamesByStoreResponse>(
    ENDPOINTS.products.namesByIdStore(storeId),
  );
  return response;
};
