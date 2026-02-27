import { database } from "@/app/database";
import { ProductType } from "@/types/productTypes";
import { Q } from "@nozbe/watermelondb";

export const getProductTypes = async (): Promise<ProductType[]> => {
  try {
    return await database.write(async () => {
      const collection = database.get("product_types");
      const types = await collection.query(Q.sortBy("name", Q.asc)).fetch();

      const typesWithServerId = types.map((type) => {
        // ✅ Extrait server_id depuis _raw ou le champ direct
        const serverId = type._raw?.server_id || type.server_id || "";

        const typeData = {
          id: type.id, // ID local WatermelonDB
          serverId: serverId, // ✅ ID serveur pour filtrage
          name: type.name,
          // _raw: type._raw,
        };

        // console.log("Type avec serverId:", {
        //   id: type.id,
        //   serverId,
        //   name: type.name,
        //   // _raw: type._raw,
        // });

        return typeData;
      });

      // console.log(" Types JSON:", JSON.stringify(typesWithServerId, null, 2));

      return typesWithServerId;
    });
  } catch (error) {
    console.error("Erreur getProductTypes:", error);
    return [];
  }
};
