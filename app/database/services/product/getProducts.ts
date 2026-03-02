import { database } from "@/app/database";
import Product from "@/app/database/models/Product";
import { Product as ProductType } from "@/types/product";
import { Q } from "@nozbe/watermelondb";

export const getProducts = async (): Promise<ProductType[]> => {
  try {
    const productsCollection = database.get<Product>("products");
    const products = await productsCollection
      .query()
      .extend(Q.sortBy("created_at", Q.desc))
      .fetch();

    // ✅ CONSOLE JSON propre
    const productsJson = products.map((product) => ({
      id: product.id,
      name: product.name,
      code: product.code,
      description: product.description,
      product_type_id: product.productTypeId,
      speculation_id: product.speculationId,
      unit_of_measure_id: product.unitOfMeasureId,
      production_area_id: product.productionAreaId,
      actor_id: product.actorId,
      store_id: product.storeId,
      quantity: product.quantity.toString(),
      price: product.price.toString(),
      origin: product.origin,
      shape: product.shape,
      measure_used: product.measureUsed,
      photo: product.photo,
      production_date: product.productionDate
        ? new Date(product.productionDate).toISOString().split("T")[0]
        : "",
      created_at: product.createdAt
        ? new Date(product.createdAt).toISOString()
        : "",
    }));
    console.log("📊 Produits JSON:", JSON.stringify(productsJson, null, 2));

    return products.map((product) => ({
      id: product.id as any,
      name: product.name,
      code: product.code,
      description: product.description,
      product_type_id: Number(product.productTypeId),
      speculation_id: Number(product.speculationId),
      unit_of_measure_id: Number(product.unitOfMeasureId),
      production_area_id: Number(product.productionAreaId),
      actor_id: Number(product.actorId),
      store_id: Number(product.storeId),
      quantity: product.quantity,
      price: product.price,
      origin: product.origin,
      shape: product.shape,
      measure_used: product.measureUsed,
      photo: product.photo ?? null,
      production_date: product.productionDate
        ? new Date(product.productionDate).toISOString().split("T")[0]
        : "",
      is_active: product.isActive,
      created_at: product.createdAt
        ? new Date(product.createdAt).toISOString()
        : "",
      updated_at: product.updatedAt
        ? new Date(product.updatedAt).toISOString()
        : "",
      updated_by: "",
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
};
