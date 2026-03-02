import { database } from "@/app/database";
import { UpdateStoreRequest } from "@/types/stores";
import { Q } from "@nozbe/watermelondb";

export const updateStoreLocal = async (
  storeId: string,
  data: UpdateStoreRequest,
) => {
  return await database.write(async () => {
    const storesCollection = database.get("stores");
    const existingStore = await storesCollection.find(storeId);

    // Vérifier doublon (autre magasin)
    const storesWithSameCode = await storesCollection
      .query(Q.where("code", data.code))
      .fetch()
      .filter((s: any) => s.id !== storeId);

    if (storesWithSameCode.length > 0) {
      throw new Error("Un autre magasin avec ce code existe déjà");
    }

    await existingStore.update((store: any) => {
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

    return existingStore;
  });
};
