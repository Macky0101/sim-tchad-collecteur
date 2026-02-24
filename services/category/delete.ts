import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { DeleteCategoryResponse } from "@/types/category";

export const deleteCategoryService = async (id: string) => {
  const { data: response } = await api.delete<DeleteCategoryResponse>(
    ENDPOINTS.categories.delete(id),
  );
  return response;
};
