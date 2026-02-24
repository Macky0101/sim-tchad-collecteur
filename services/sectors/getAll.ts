import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { ListSectorsResponse } from "@/types/sectors";

export const getAllSectorsService = async () => {
  const { data: response } = await api.get<ListSectorsResponse>(
    ENDPOINTS.sectors.list,
  );
  return response;
};
