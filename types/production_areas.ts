export interface ProductionArea {
  id: number;
  name: string;
  code: string;
  actor_id: number;
  latitude: string;
  longitude: string;
  address: string;
  photo: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProductionAreaRequest {
  name: string;
  code: string;
  actor_id: number;
  latitude: string;
  longitude: string;
  address: string;
  photo: string;
  updated_by: string;
}

export interface CreateProductionAreaResponse {
  Message: string;
  data: ProductionArea;
}

export interface UpdateProductionAreaRequest {
  id: number;
  name: string;
  code: string;
  actor_id: number;
  latitude: string;
  longitude: string;
  address: string;
  photo: string;
  updated_by: string;
}

export interface UpdateProductionAreaResponse {
  Message: string;
  data: ProductionArea;
}

export interface DeleteProductionAreaRequest {
  id: number;
}

export interface DeleteProductionAreaResponse {
  Message: string;
  data: ProductionArea;
}

export interface GetOneProductionAreaRequest {
  id: number;
}

export interface GetOneProductionAreaResponse {
  Message: string;
  data: ProductionArea;
}

export interface ListProductionAreasResponse {
  Message: string;
  data: ProductionArea[];
  total: number;
}

export interface ListProductionAreasRequest {
  page?: number;
  limit?: number;
  search?: string;
}
