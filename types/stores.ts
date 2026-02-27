export interface Store {
  id: number;
  serverId: string;
  name: string;
  code: string;
  description: string;
  is_active: number;
  actor_id: number;
  latitude: string;
  longitude: string;
  address: string;
  phone: string;
  whatsapp: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateStoreRequest {
  name: string;
  code: string;
  description: string;
  is_active: number;
  actor_id: number;
  latitude: string;
  longitude: string;
  address: string;
  phone: string;
  whatsapp: string;
  updated_by: string;
}

export interface CreateStoreResponse {
  store: Store;
}

export interface UpdateStoreRequest {
  id: number;
  name: string;
  code: string;
  description: string;
  is_active: number;
  actor_id: number;
  latitude: string;
  longitude: string;
  address: string;
  phone: string;
  whatsapp: string;
  updated_by: string;
}

export interface UpdateStoreResponse {
  store: Store;
}

export interface DeleteStoreRequest {
  id: number;
}

export interface DeleteStoreResponse {
  store: Store;
}

export interface GetOneStoreRequest {
  id: number;
}

export interface GetOneStoreResponse {
  data: Store;
}

export interface ListStoresRequest {
  page?: number;
  limit?: number;
  search?: string;
  actor_id?: number;
}

export interface ListStoresResponse {
  data: Store[];
  total?: number;
}
