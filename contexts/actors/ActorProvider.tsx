import { createActorService } from "@/services/actors/create";
import { GetActorsService } from "@/services/actors/getAll";
import { GetActorByIdService } from "@/services/actors/getOne";
import { UpdateActorService } from "@/services/actors/update";
import { GetTypeActorsService } from "@/services/typeActors/getAll";
import { Actor, CreateActorRequest, UpdateActorRequest } from "@/types/actors";
import { typeActor } from "@/types/typeActor";
import { useState } from "react";
import { ActorContext } from "./ActorContext";

export const ActorProvider = ({ children }: { children: React.ReactNode }) => {
  const [actor, setActor] = useState<Actor | null>(null);
  const [typeActors, setTypeActors] = useState<typeActor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actors, setActors] = useState<Actor[]>([]);

  const GetActors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await GetActorsService();
      console.log("Actors fetched successfully Macky", response);
      setActors(response.data);
    } catch (error: any) {
      console.log("Actor fetching failed Macky", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const createActor = async (data: CreateActorRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createActorService(data);
      console.log("Actor created successfully Macky", response);
      setActor(response.actor);
    } catch (error: any) {
      console.log("Actor creation failed Macky", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateActor = async (data: UpdateActorRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await UpdateActorService(data);
      setActor(response.actor);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getActorById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await GetActorByIdService(id);
      setActor(response.actor);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getTypeActors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await GetTypeActorsService();
      setTypeActors(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActorContext.Provider
      value={{
        actor,
        loading,
        error,
        createActor,
        updateActor,
        getActorById,
        deleteActor: async () => {},
        typeActors,
        getTypeActors,
        GetActors,
      }}
    >
      {children}
    </ActorContext.Provider>
  );
};
