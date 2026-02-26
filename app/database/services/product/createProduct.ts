import { database } from "@/app/database";
import { CreateProductRequest } from "@/types/product";
import { Q } from "@nozbe/watermelondb";

export const createProductLocal = async (data: CreateProductRequest) => {
  return await database.write(async () => {
    // ✅ DANS database.write() → Writer activé
    const productsCollection = database.get("products");

    // Vérifier doublon (dans le même writer)
    const existingProduct = await productsCollection
      .query(Q.where("code", data.code))
      .fetch();

    if (existingProduct.length > 0) {
      throw new Error("Un produit avec ce code existe déjà");
    }

    // ✅ create() maintenant autorisé
    return await productsCollection.create((product: any) => {
      product.name = data.name;
      product.code = data.code;
      product.description = data.description ?? "";

      // Les IDs viennent des selects : ce sont les server_id (strings comme "1", "2"...)
      product.product_type_id = String(data.product_type_id);
      product.speculation_id = String(data.speculation_id);
      product.unit_of_measure_id = String(data.unit_of_measure_id);
      product.production_area_id = String(data.production_area_id);
      product.actor_id = String(data.actor_id);
      product.store_id = String(data.store_id);

      product.quantity = Number(data.quantity);
      product.price = Number(data.price);
      product.origin = data.origin;
      product.shape = data.shape;
      product.measure_used = data.measure_used;
      product.photo = data.photo ?? null;
      product.production_date = data.production_date;
    });
  });
};
