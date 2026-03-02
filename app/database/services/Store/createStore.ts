import { database } from "@/app/database";
import { CreateStoreRequest } from "@/types/stores";
import { Q } from "@nozbe/watermelondb";

export const createStoreLocal = async (data: CreateStoreRequest) => {
  return await database.write(async () => {
    const storesCollection = database.get("stores");

    // Vérifier doublon code
    const existingStore = await storesCollection
      .query(Q.where("code", data.code))
      .fetch();

    if (existingStore.length > 0) {
      throw new Error("Un magasin avec ce code existe déjà");
    }

    return await storesCollection.create((store: any) => {
      store.name = data.name;
      store.code = data.code;
      store.description = data.description ?? "";
      store.address = data.address ?? "";
      store.phone = data.phone ?? "";
      store.is_active = 1;
      store.latitude = data.latitude ?? "";
      store.longitude = data.longitude ?? "";
      store.whatsapp = data.whatsapp ?? "";
    });
  });
};
