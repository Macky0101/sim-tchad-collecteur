// {
//     "Message": "Settings recupérés avec succès",
//     "data": [
//         {
//             "id": 1,
//             "organization_acronym": "SIM v2",
//             "organization_name": "Système d’Information des Marchés du Tchad",
//             "system_acronym": "SIM-TCHAD",
//             "system_name": "Plateforme SIM Tchad",
//             "system_description": "Système national de collecte et diffusion des prix des marchés",
//             "system_slogan": "Informer pour mieux décider",
//             "system_logo": "logos/sim-tchad.png",
//             "organization_address": "Avenue Mobutu, N'Djamena",
//             "organization_email": "contact@simtchad.td",
//             "organization_phone": "+23566000000",
//             "organization_whatsapp": "+23566000000",
//             "organization_level_code": "NATIONAL",
//             "organization_locality": "N'Djamena",
//             "updated_by": null,
//             "created_at": "2026-01-14T04:38:59.000000Z",
//             "updated_at": "2026-01-14T04:39:33.000000Z"
//         }
//     ]
// }

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
