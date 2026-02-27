import { database } from "@/app/database";
import { Store } from "@/types/stores";
import { Q } from "@nozbe/watermelondb";

export const getStores = async (): Promise<Store[]> => {
  try {
    const collection = database.get("stores");
    const stores = await collection.query(Q.sortBy("name", Q.asc)).fetch();

    return stores.map((store) => ({
      id: store.id,
      name: store.name,
      code: store.code,
      description: store.description,
      is_active: store.is_active,
      actor_id: store.actor_id,
      latitude: store.latitude,
      longitude: store.longitude,
      address: store.address,
      phone: store.phone,
      whatsapp: store.whatsapp,
      updated_by: store.updated_by,
      created_at: store.created_at,
      updated_at: store.updated_at,
    }));
  } catch (error) {
    console.error("Erreur getStores:", error);
    return [];
  }
};
