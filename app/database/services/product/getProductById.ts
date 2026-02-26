import { database } from "@/app/database";
import { Product } from "@/types/product";
import { Q } from "@nozbe/watermelondb";

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    return await database.read(async () => {
      const productsCollection = database.get("products");
      const product = await productsCollection.query(Q.where("id", id)).fetch();

      if (product.length === 0) {
        return null;
      }

      const productData = product[0];
      return {
        id: productData.id,
        name: productData.name,
        code: productData.code,
        description: productData.description,
        product_type_id: productData.product_type_id,
        speculation_id: productData.speculation_id,
        unit_of_measure_id: productData.unit_of_measure_id,
        production_area_id: productData.production_area_id,
        actor_id: productData.actor_id,
        store_id: productData.store_id,
        quantity: productData.quantity.toString(),
        price: productData.price.toString(),
        origin: productData.origin,
        shape: productData.shape,
        measure_used: productData.measure_used,
        photo: productData.photo,
        production_date: productData.production_date,
        created_at: productData.created_at,
      };
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    throw error;
  }
};
