export interface ProductType {
  id: number;
  name: string;
  code: string;
  description: string;
  is_active: number;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ListProductTypesResponse {
  Message: string;
  data: ProductType[];
}
