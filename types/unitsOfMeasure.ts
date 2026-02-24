// {
//     "Message": "Unites de mesure recuperees avec succes",
//     "data": [
//         {
//             "id": 1,
//             "name": "kilogramme",
//             "code": "kg",
//             "created_at": "2026-01-14T05:22:22.000000Z",
//             "updated_at": "2026-01-29T07:56:18.000000Z"
//         }
//     ]
// }

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
