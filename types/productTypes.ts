export interface ProductType {
  id: string;
  name: string;
  code: string;
  description: string;
  is_active: number;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  serverId: string;
}

export interface ListProductTypesResponse {
  Message: string;
  data: ProductType[];
}
