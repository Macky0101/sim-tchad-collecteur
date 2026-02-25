export interface UnitOfMeasure {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface GetAllUnitsOfMeasureResponse {
  Message: string;
  data: UnitOfMeasure[];
}

export interface CreateUnitOfMeasureRequest {
  name: string;
  code: string;
}

export interface UpdateUnitOfMeasureRequest {
  name?: string;
  code?: string;
}

export interface GetOneUnitOfMeasureResponse {
  Message: string;
  data: UnitOfMeasure;
}
