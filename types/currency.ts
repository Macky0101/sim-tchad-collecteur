/**
 * Interface pour l'entité Currency (Devise).
 * Représente les données d'une devise dans l'API.
 */
export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
  exchange_rate: string;
  is_base_currency: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

/**
 * Response pour list currencies.
 */
export interface ListCurrenciesResponse {
  Message: string;
  data: Currency[];
}
