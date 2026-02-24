import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ListCategoriesResponse } from "@/types/category";

export const getAllCategoryService = async () => {
  const { data: response } = await api.get<ListCategoriesResponse>(
    ENDPOINTS.categories.list,
  );
  return response;
};
