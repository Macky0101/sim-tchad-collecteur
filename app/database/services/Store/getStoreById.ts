import { database } from "@/app/database";
import Store from "@/app/database/models/Store";
import { Store as StoreType } from "@/types/stores";

export const getStoreById = async (id: string): Promise<StoreType | null> => {
  try {
    const storesCollection = database.get<Store>("stores");
    const storeData = await storesCollection.find(id);

    return {
      id: storeData.id as any,
      code: storeData.code,
      name: storeData.name,
      description: storeData.description,
      is_active: storeData.isActive,
      actor_id: Number(storeData.actorId),
      latitude: storeData.latitude,
      longitude: storeData.longitude,
      serverId: storeData.serverId,
      address: storeData.address,
      phone: storeData.phone,
      whatsapp: storeData.whatsapp,
      created_at: storeData.createdAt
        ? new Date(storeData.createdAt).toISOString()
        : "",
      updated_at: storeData.updatedAt
        ? new Date(storeData.updatedAt).toISOString()
        : "",
      updated_by: "",
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du magasin:", error);
    return null;
  }
};
