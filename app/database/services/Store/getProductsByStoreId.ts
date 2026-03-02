// services/product/getProductsByStoreId.ts (NOUVEAU FICHIER)
import { database } from "@/app/database";
import { Product } from "@/types/product";
import { Q } from "@nozbe/watermelondb";

export const getProductsByStoreId = async (
  storeId: string,
): Promise<Product[]> => {
  try {
    const productsCollection = database.get<any>("products");

    //  Récupère TOUS les produits de ce magasin
    const products = await productsCollection
      .query(
        Q.where("store_id", storeId),
        Q.sortBy("created_at", Q.desc), // Plus récents en 1er
      )
      .fetch();

    //  Transforme en format Product avec correct mapping
    const productsFormatted = products.map((product: any) => ({
      id: product.id,
      name: product.name,
      code: product.code,
      description: product.description || "",
      product_type_id: Number(product.productTypeId) || 0,
      speculation_id: Number(product.speculationId) || 0,
      unit_of_measure_id: Number(product.unitOfMeasureId) || 0,
      production_area_id: Number(product.productionAreaId) || 0,
      actor_id: Number(product.actorId) || 0,
      store_id: Number(product.storeId) || 0,
      quantity: Number(product.quantity) || 0,
      price: Number(product.price) || 0,
      origin: product.origin || "",
      shape: product.shape || "",
      measure_used: product.measureUsed || "",
      photo: product.photo || null,
      is_active: product.isActive,
      updated_by: product.updatedBy || "",
      production_date: product.productionDate
        ? new Date(product.productionDate).toISOString()
        : "",
      created_at: product.createdAt
        ? new Date(product.createdAt).toISOString()
        : "",
      updated_at: product.updatedAt
        ? new Date(product.updatedAt).toISOString()
        : "",
    }));

    console.log(
      `📦 ${productsFormatted.length} produits trouvés pour magasin ${storeId}`,
    );

    return productsFormatted;
  } catch (error) {
    console.error("Erreur getProductsByStoreId:", error);
    return [];
  }
};
