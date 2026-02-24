import { Actor, CreateActorRequest, UpdateActorRequest } from "@/types/actors";
import { typeActor } from "@/types/typeActor";
import { createContext } from "react";

export type ActorContextType = {
  actor: Actor[];
  loading: boolean;
  error: string | null;
  createActor: (data: CreateActorRequest) => Promise<void>;
  updateActor: (data: UpdateActorRequest) => Promise<void>;
  getActorById: (id: string) => Promise<void>;
  deleteActor: (id: string) => Promise<void>;
  typeActors: typeActor[];
  getTypeActors: () => Promise<void>;
  GetActors: () => Promise<void>;
};

export const ActorContext = createContext<ActorContextType | undefined>(
  undefined,
);
