import { database } from "@/app/database";
import Product from "@/app/database/models/Product";
import { Product as ProductType } from "@/types/product";
import { Q } from "@nozbe/watermelondb";

export const getProductById = async (
  id: string,
): Promise<ProductType | null> => {
  try {
    const productsCollection = database.get<Product>("products");
    const products = await productsCollection.query(Q.where("id", id)).fetch();

    if (products.length === 0) {
      return null;
    }

    const productData = products[0];
    return {
      id: productData.id as any,
      name: productData.name,
      code: productData.code,
      description: productData.description,
      product_type_id: Number(productData.productTypeId),
      speculation_id: Number(productData.speculationId),
      unit_of_measure_id: Number(productData.unitOfMeasureId),
      production_area_id: Number(productData.productionAreaId),
      actor_id: Number(productData.actorId),
      store_id: Number(productData.storeId),
      quantity: productData.quantity,
      price: productData.price,
      origin: productData.origin,
      shape: productData.shape,
      measure_used: productData.measureUsed,
      photo: productData.photo ?? null,
      production_date: productData.productionDate
        ? new Date(productData.productionDate).toISOString().split("T")[0]
        : "",
      is_active: productData.isActive,
      created_at: productData.createdAt
        ? new Date(productData.createdAt).toISOString()
        : "",
      updated_at: productData.updatedAt
        ? new Date(productData.updatedAt).toISOString()
        : "",
      updated_by: "",
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    throw error;
  }
};
