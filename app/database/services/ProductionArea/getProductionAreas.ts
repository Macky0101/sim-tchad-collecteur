import { database } from "@/app/database";
import { ProductionArea } from "@/types/production_areas";
import { Q } from "@nozbe/watermelondb";

export const getProductionAreas = async (): Promise<ProductionArea[]> => {
  try {
    const collection = database.get("production_areas");
    const productionAreas = await collection
      .query(Q.sortBy("name", Q.asc))
      .fetch();

    return productionAreas.map((productionArea) => ({
      id: productionArea.id,
      name: productionArea.name,
      code: productionArea.code,
      actor_id: productionArea.actor_id,
      latitude: productionArea.latitude,
      longitude: productionArea.longitude,
      address: productionArea.address,
      photo: productionArea.photo,
      updated_by: productionArea.updated_by,
      created_at: productionArea.created_at,
      updated_at: productionArea.updated_at,
    }));
  } catch (error) {
    console.error("Erreur getProductionAreas:", error);
    return [];
  }
};
