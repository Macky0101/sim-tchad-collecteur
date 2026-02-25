import { Q } from "@nozbe/watermelondb";
import { database } from "..";

export const syncCollection = async (
  tableName: string,
  fetchService: () => Promise<any>,
) => {
  try {
    const collection = database.get(tableName);
    const apiResponse = await fetchService();
    const items = apiResponse.data || [];

    await database.write(async () => {
      for (const item of items) {
        const serverId = String(item.id);
        if (!serverId) continue;

        // Recherche par server_id
        const existingRecords = await collection
          .query(Q.where("server_id", serverId))
          .fetch();

        const existing = existingRecords[0];

        if (existing) {
          // Mise à jour
          await (existing as any).updateFromServer(item);
        } else {
          // Création (l'ID Watermelon est auto-généré)
          const newRecord = await collection.create((record) => {
            // On ne remplit rien ici, updateFromServer s'en chargera
          });
          await (newRecord as any).updateFromServer(item);
        }
      }
    });

    console.log(
      `✅ Collection "${tableName}" synchronisée (${items.length} éléments)`,
    );
  } catch (error) {
    console.error(`❌ Erreur synchro ${tableName}:`, error);
    throw error; // ou return selon votre stratégie
  }
};
