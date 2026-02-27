import { database } from "@/app/database";
import { Speculation } from "@/types/speculation";
import { Q } from "@nozbe/watermelondb";

export const getSpeculations = async (): Promise<Speculation[]> => {
  try {
    const collection = database.get("speculations");
    const speculations = await collection
      .query(Q.sortBy("name", Q.asc))
      .fetch();

    return speculations.map((spec) => ({
      id: spec.id,
      name: spec.name,
      description: spec.description,
      code: spec.code,
      category_id: spec.category_id,
      is_active: spec.is_active,
      updated_by: spec.updated_by,
      created_at: spec.created_at,
      updated_at: spec.updated_at,
      photo: spec.photo,
    }));
  } catch (error) {
    console.error("Erreur getSpeculations:", error);
    return [];
  }
};
