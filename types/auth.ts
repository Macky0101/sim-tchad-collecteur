export interface LoginRequest {
  phone: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    actor: string;
    actor_sigle: string;
    email: string;
    phone: string;
    whatsapp: string;
    actor_type_id: number;
    is_active: number;
    headquarter_photo: string;
    logo: string;
    address: string;
    latitude: string;
    longitude: string;
    updated_by: null;
    code: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
}
