import { Sector } from "./sectors";

/**
 * Interface pour l'entité Category.
 * Représente les données d'une catégorie dans l'API.
 */
export interface Category {
  id?: number;
  name: string;
  description: string;
  code: string;
  sector_id: number; // Référence vers le secteur parent (sector_id)
  is_active: boolean;
  updated_by?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  sector?: Sector;
}

/**
 * Request pour créer une catégorie (input API).
 */
export interface CreateCategoryRequest {
  name: string;
  description: string;
  code: string;
  sector_id: number;
  is_active?: boolean;
  updated_by?: string;
}

/**
 * Response pour create category (output API).
 */
export interface CreateCategoryResponse {
  category: Category;
}

/**
 * Request pour update category (Partial pour champs optionnels).
 */
export interface UpdateCategoryRequest {
  id: number;
  name: string;
  description: string;
  code: string;
  sector_id: number;
  is_active?: boolean;
  updated_by?: string;
}

/**
 * Response pour update category.
 */
export interface UpdateCategoryResponse {
  category: Category;
}

/**
 * Request pour delete category.
 */
export interface DeleteCategoryRequest {
  id: number;
}

/**
 * Response pour delete category.
 */
export interface DeleteCategoryResponse {
  success: boolean;
  message?: string;
}

/**
 * Request pour get one category.
 */
export interface GetOneCategoryRequest {
  id: number;
}

/**
 * Response pour get one category.
 */
export interface GetOneCategoryResponse {
  data: Category;
}

/**
 * Request pour list categories (filters/pagination si besoin).
 */
export interface ListCategoriesRequest {
  page?: number;
  limit?: number;
  search?: string;
  sector_id?: number; // Filtrer par secteur
}

/**
 * Response pour list categories.
 */
export interface ListCategoriesResponse {
  data: Category[];
  total?: number; // Pour pagination
}
