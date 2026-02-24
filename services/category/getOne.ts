import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { GetOneCategoryResponse } from "@/types/category";

export const getOneCategoryService = async (id: string) => {
  const { data: response } = await api.get<GetOneCategoryResponse>(
    ENDPOINTS.categories.getOne(id),
  );
  return response;
};
