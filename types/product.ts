export interface Product {
  id: number;
  name: string;
  code: string;
  description: string;
  product_type_id: number;
  speculation_id: number;
  unit_of_measure_id: number;
  production_area_id: number;
  actor_id: number;
  store_id: number;
  updated_by: string;
  quantity: number;
  price: number;
  origin: string;
  shape: string;
  measure_used: string;
  photo: string | null;
  production_date: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface ListProductsResponse {
  Message: string;
  data: Product[];
}

export interface GetOneProductResponse {
  Message: string;
  data: Product;
}

export interface CreateProductRequest {
  name: string;
  code: string;
  product_type_id: number;
  speculation_id: number;
  unit_of_measure_id: number;
  production_area_id: number;
  actor_id: number;
  store_id: number;
  quantity: number;
  price: number;
  origin: string;
  shape: string;
  measure_used: string;
  production_date: string;
  photo?: any; // For multipart/form-data
  attributes?: string; // JSON string for attributes
  name_in_others_languages?: string; // JSON string
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number | string;
}

export interface ProductNamesByStoreResponse {
  Message: string;
  data: Array<{
    id: number;
    name: string;
  }>;
}

export interface ProductAttribute {
  attribute_id: number;
  attribute_name: string;
  value: string;
}

export interface ProductWithAttributes {
  id: number;
  name: string;
  code: string;
  quantity: number;
  price: number;
  attributes: ProductAttribute[];
}

export interface GetProductWithAttributesResponse {
  Message: string;
  data: ProductWithAttributes[];
}
