// {
//     "Message": "Production areas recuperees avec succes",
//     "data": [
//         {
//             "id": 1,
//             "name": "Zone de production Sud v2",
//             "code": "ZPSUD001",
//             "actor_id": 1,
//             "latitude": "12.13456789",
//             "longitude": "15.06789123",
//             "address": "Région du Chari-Baguirmi",
//             "photo": "photos/zones/zpsud001.jpg",
//             "updated_by": "admin",
//             "created_at": "2026-01-14T04:52:55.000000Z",
//             "updated_at": "2026-01-22T02:29:20.000000Z"
//         }
//     ]
// }

export interface ProductionArea {
  id: number;
  name: string;
  code: string;
  actor_id: number;
  latitude: string;
  longitude: string;
  address: string;
  photo: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProductionAreaRequest {
  name: string;
  code: string;
  actor_id: number;
  latitude: string;
  longitude: string;
  address: string;
  photo: string;
  updated_by: string;
}

export interface CreateProductionAreaResponse {
  Message: string;
  data: ProductionArea;
}

export interface UpdateProductionAreaRequest {
  id: number;
  name: string;
  code: string;
  actor_id: number;
  latitude: string;
  longitude: string;
  address: string;
  photo: string;
  updated_by: string;
}

export interface UpdateProductionAreaResponse {
  Message: string;
  data: ProductionArea;
}

export interface DeleteProductionAreaRequest {
  id: number;
}

export interface DeleteProductionAreaResponse {
  Message: string;
  data: ProductionArea;
}

export interface GetOneProductionAreaRequest {
  id: number;
}

export interface GetOneProductionAreaResponse {
  Message: string;
  data: ProductionArea;
}

export interface ListProductionAreasResponse {
  Message: string;
  data: ProductionArea[];
  total: number;
}

export interface ListProductionAreasRequest {
  page?: number;
  limit?: number;
  search?: string;
}
