import { database } from "@/app/database";
import { Product } from "@/types/product";
import { Q } from "@nozbe/watermelondb";

export const getProducts = async (): Promise<Product[]> => {
  try {
    return await database.read(async () => {
      const productsCollection = database.get("products");
      const products = await productsCollection
        .query()
        .extend(Q.sortBy("created_at", Q.desc))
        .fetch();

      return products.map((product) => ({
        id: product.id,
        name: product.name,
        code: product.code,
        description: product.description,
        product_type_id: product.product_type_id,
        speculation_id: product.speculation_id,
        unit_of_measure_id: product.unit_of_measure_id,
        production_area_id: product.production_area_id,
        actor_id: product.actor_id,
        store_id: product.store_id,
        quantity: product.quantity.toString(),
        price: product.price.toString(),
        origin: product.origin,
        shape: product.shape,
        measure_used: product.measure_used,
        photo: product.photo,
        production_date: product.production_date,
        created_at: product.created_at,
      }));
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
};
