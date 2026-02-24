export interface Speculation {
  id: number;
  name: string;
  description: string;
  code: string;
  category_id: number;
  is_active: number;
  updated_by: string;
  created_at: string;
  updated_at: string;
  photo: string;
}

export interface CreateSpeculationRequest {
  name: string;
  description: string;
  code: string;
  category_id: number;
}

export interface CreateSpeculationResponse {
  speculation: Speculation;
}

export interface UpdateSpeculationRequest {
  id: number;
  name: string;
  description: string;
  code: string;
  category_id: number;
}

export interface UpdateSpeculationResponse {
  speculation: Speculation;
}

export interface DeleteSpeculationRequest {
  id: number;
}

export interface DeleteSpeculationResponse {
  success: boolean;
  message?: string;
}

export interface GetOneSpeculationRequest {
  id: number;
}

export interface GetOneSpeculationResponse {
  data: Speculation;
}

export interface ListSpeculationsRequest {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: number;
}

export interface ListSpeculationsResponse {
  data: Speculation[];
  total?: number;
}
