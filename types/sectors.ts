export interface Sector {
  id?: string;
  name: string;
  description: string;
  code: string;
  isActive: boolean;
  updatedBy?: string;
}

// creer un sectors

export interface CreateSectorRequest {
  name: string;
  description: string;
  code: string;
  isActive?: boolean;
  updatedBy?: string;
}

// response create sector

export interface CreateSectorResponse {
  sector: Sector;
}

// update un sector

export interface UpdateSectorRequest {
  id: string;
  name: string;
  description: string;
  code: string;
  isActive?: boolean;
  updatedBy?: string;
}

// response update sector

export interface UpdateSectorResponse {
  sector: Sector;
}

// delete un sector

export interface DeleteSectorRequest {
  id: string;
}

// response delete sector

export interface DeleteSectorResponse {
  success: boolean;
  message?: string;
}

// get one sector

export interface GetOneSectorRequest {
  id: string;
}

// response get one sector

export interface GetOneSectorResponse {
  data: Sector;
}

export interface ListSectorsResponse {
  data: Sector[];
  total: number;
}
