import { database } from "@/app/database";
import { Q } from "@nozbe/watermelondb";

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    return await database.write(async () => {
      const productsCollection = database.get("products");
      const product = await productsCollection.query(Q.where("id", id)).fetch();

      if (product.length === 0) {
        throw new Error("Produit non trouvé");
      }

      // Destruction avec relations (si vous avez des liens)
      await product[0].destroyPermanently();
      return true;
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    throw error;
  }
};
