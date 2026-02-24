import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { UpdateCategoryRequest } from "@/types/category";

export const updateCategoryService = async (data: UpdateCategoryRequest) => {
  const { data: response } = await api.put<UpdateCategoryRequest>(
    ENDPOINTS.categories.update(data.id),
    data,
  );
  return response;
};
