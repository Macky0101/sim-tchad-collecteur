import { database } from "@/app/database";
import { Q } from "@nozbe/watermelondb";

export const deleteStore = async (storeId: string) => {
  return await database.write(async () => {
    const storesCollection = database.get("stores");

    // Vérifier si magasin utilisé dans produits
    const productsUsingStore = await database
      .get("products")
      .query(Q.where("store_id", storeId))
      .fetch();

    if (productsUsingStore.length > 0) {
      throw new Error(
        "Impossible de supprimer : magasin utilisé dans des produits",
      );
    }

    const store = await storesCollection.find(storeId);
    await store.destroyPermanently();
  });
};
