export interface typeActor {
  id: number;
  name: string;
  code: string;
  description: string;
}

export interface ListTypeActorsResponse {
  Message: string;
  data: typeActor[];
}
