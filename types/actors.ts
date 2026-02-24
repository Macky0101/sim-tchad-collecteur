/**
 * Interface pour l'entité Actor (acteur).
 * Représente les données d'un acteur dans l'API.
 */
export interface Actor {
  id?: number; // Optionnel si auto-généré par backend
  name: string; // Renommé "actor" → "name" pour clarté
  sigle: string; // Renommé "actor_sigle" → "sigle"
  email: string;
  phone: string;
  whatsapp?: string; // Optionnel
  actorTypeId: number; // Renommé pour camelCase
  isActive: boolean;
  headquarterPhoto?: string; // Optionnel
  logo?: string; // Optionnel
  address: string;
  latitude?: number; // Optionnel si pas toujours présent
  longitude?: number; // Optionnel
  password?: string; // Seulement pour create/register – ne stocke pas en clair après !
  updatedBy?: string; // Optionnel
  code: string;
  description?: string; // Optionnel
  createdAt?: string; // Ajouté (ISO date si backend)
  updatedAt?: string; // Ajouté
}

/**
 * Request pour créer un actor (input API).
 */
// types/actors.ts
export interface CreateActorRequest {
  actor: string; // correspond à "name" avant
  actor_sigle: string; // correspond à "sigle"
  email: string;
  phone: string;
  whatsapp?: string;
  actor_type_id: number; // correspond à "actorTypeId"
  is_active: boolean; // ajouté
  headquarter_photo?: string; // correspond à "headquarterPhoto"
  logo?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  password: string;
  updated_by?: string; // ajouté
  code: string;
  description?: string;
}

/**
 * Response pour create actor (output API).
 */
export interface CreateActorResponse {
  actor: Actor;
}

/**
 * Request pour update actor (Partial pour champs optionnels).
 */
export interface UpdateActorRequest extends Partial<Actor> {
  id: number; // Obligatoire pour identifier
}

/**
 * Response pour update actor.
 */
export interface UpdateActorResponse {
  actor: Actor;
}

/**
 * Request pour delete actor.
 */
export interface DeleteActorRequest {
  id: string;
}

/**
 * Response pour delete actor (souvent void, mais ici pour confirmation).
 */
export interface DeleteActorResponse {
  success: boolean;
  message?: string;
}

/**
 * Request pour get one actor.
 */
export interface GetOneActorRequest {
  id: string;
}

/**
 * Response pour get one actor.
 */
export interface GetOneActorResponse {
  actor: Actor;
}

/**
 * Request pour list actors (pour filters/pagination si besoin).
 */
export interface ListActorsRequest {
  page?: number;
  limit?: number;
  search?: string; // Optionnel pour filters
}

/**
 * Response pour list actors.
 */
export interface ListActorsResponse {
  Message: string;
  data: Actor[];
  total: number; // Pour pagination
}
