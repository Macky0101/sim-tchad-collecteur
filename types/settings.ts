export interface Settings {
  id?: string;
  organization_acronym: string;
  organization_name: string;
  system_acronym: string;
  system_name: string;
  system_description: string;
  system_slogan: string;
  system_logo: string;
  organization_address: string;
  organization_email: string;
  organization_phone: string;
  organization_whatsapp: string;
  organization_level_code: string;
  organization_locality: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSettingsRequest {
  organization_acronym: string;
  organization_name: string;
  system_acronym: string;
  system_name: string;
  system_description: string;
  system_slogan: string;
  system_logo: string;
  organization_address: string;
  organization_email: string;
  organization_phone: string;
  organization_whatsapp: string;
  organization_level_code: string;
  organization_locality: string;
}

export interface CreateSettingsResponse {
  Message: string;
  data: Settings[];
}

export interface UpdateSettingsRequest {
  id: number;
  organization_acronym: string;
  organization_name: string;
  system_acronym: string;
  system_name: string;
  system_description: string;
  system_slogan: string;
  system_logo: string;
  organization_address: string;
  organization_email: string;
  organization_phone: string;
  organization_whatsapp: string;
  organization_level_code: string;
  organization_locality: string;
}

export interface UpdateSettingsResponse {
  Message: string;
  data: Settings[];
}

export interface DeleteSettingsRequest {
  id: number;
}

export interface DeleteSettingsResponse {
  Message: string;
  data: Settings[];
}

export interface GetOneSettingsRequest {
  id: number;
}

export interface GetOneSettingsResponse {
  Message: string;
  data: Settings;
}

export interface GetAllSettingsResponse {
  Message: string;
  data: Settings[];
}
