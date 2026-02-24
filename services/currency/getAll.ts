import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ListCurrenciesResponse } from "@/types/currency";

export const getAllCurrenciesService = async () => {
  const { data: response } = await api.get<ListCurrenciesResponse>(
    ENDPOINTS.currencies.list,
  );
  return response;
};
