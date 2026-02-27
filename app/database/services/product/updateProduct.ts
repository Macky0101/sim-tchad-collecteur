import { database } from "@/app/database";
import { CreateProductRequest } from "@/types/product";
import { Q } from "@nozbe/watermelondb";

export const updateProductLocal = async (
  productId: string,
  data: CreateProductRequest,
) => {
  return await database.write(async () => {
    const productsCollection = database.get("products");

    //  Récupère le produit existant
    const existingProduct = await productsCollection.find(productId);

    const allProductsWithCode = await productsCollection
      .query(Q.where("code", data.code))
      .fetch();

    const productsWithSameCode = allProductsWithCode.filter(
      (p) => p.id !== productId,
    );

    if (productsWithSameCode.length > 0) {
      throw new Error("Un autre produit avec ce code existe déjà");
    }

    // UPDATE
    await existingProduct.update((product: any) => {
      product.name = data.name;
      product.code = data.code;
      product.description = data.description ?? "";

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

    return existingProduct;
  });
};
