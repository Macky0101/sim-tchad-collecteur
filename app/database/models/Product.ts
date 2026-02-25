import { Actor } from "@/types/actors";
import { ProductionArea } from "@/types/production_areas";
import { ProductType } from "@/types/productTypes";
import { Speculation } from "@/types/speculation";
import { Store } from "@/types/stores";
import { UnitOfMeasure } from "@/types/unitsOfMeasure";
import { Model } from "@nozbe/watermelondb";
import {
    field,
    immutableRelation,
    writer,
} from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";

export default class Product extends Model {
  static table = "products";

  static associations: Associations = {
    product_types: { type: "belongs_to", key: "product_type_id" },
    speculations: { type: "belongs_to", key: "speculation_id" },
    units_of_measure: { type: "belongs_to", key: "unit_of_measure_id" },
    production_areas: { type: "belongs_to", key: "production_area_id" },
    actors: { type: "belongs_to", key: "actor_id" },
    stores: { type: "belongs_to", key: "store_id" },
  };

  // Champs de synchronisation
  @field("server_id") serverId!: string;
  @field("server_updated_at") serverUpdatedAt?: number;

  // Champs métier (tous en @field, même les dates → stockées en timestamp)
  @field("name") name!: string;
  @field("code") code!: string;
  @field("description") description!: string;
  @field("quantity") quantity!: number;
  @field("price") price!: number;
  @field("origin") origin!: string;
  @field("shape") shape!: string;
  @field("measure_used") measureUsed!: string;
  @field("photo") photo?: string;
  @field("is_active") isActive!: number;

  // Dates stockées en timestamp
  @field("production_date") productionDate!: number;
  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  // Clés étrangères (explicitement déclarées)
  @field("product_type_id") productTypeId!: string;
  @field("speculation_id") speculationId!: string;
  @field("unit_of_measure_id") unitOfMeasureId!: string;
  @field("production_area_id") productionAreaId!: string;
  @field("actor_id") actorId!: string;
  @field("store_id") storeId!: string;

  // Relations (immutables)
  @immutableRelation("product_types", "product_type_id")
  productType!: ProductType;
  @immutableRelation("speculations", "speculation_id")
  speculation!: Speculation;
  @immutableRelation("units_of_measure", "unit_of_measure_id")
  unitOfMeasure!: UnitOfMeasure;
  @immutableRelation("production_areas", "production_area_id")
  productionArea!: ProductionArea;
  @immutableRelation("actors", "actor_id") actor!: Actor;
  @immutableRelation("stores", "store_id") store!: Store;

  @writer
  async updateFromServer(data: any) {
    await this.update((record) => {
      // Synchronisation
      record.serverId = String(data.id);
      record.serverUpdatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : undefined;

      // Données principales
      record.name = data.name;
      record.code = data.code;
      record.description = data.description;
      record.quantity = data.quantity;
      record.price = data.price;
      record.origin = data.origin;
      record.shape = data.shape;
      record.measureUsed = data.measure_used;
      record.photo = data.photo;
      record.isActive = data.is_active;

      // Dates (conversion en timestamp)
      record.productionDate = new Date(data.production_date).getTime();
      record.createdAt = new Date(data.created_at).getTime();
      record.updatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : new Date().getTime();

      // Clés étrangères (conversion en string)
      record.productTypeId = String(data.product_type_id);
      record.speculationId = String(data.speculation_id);
      record.unitOfMeasureId = String(data.unit_of_measure_id);
      record.productionAreaId = String(data.production_area_id);
      record.actorId = String(data.actor_id);
      record.storeId = String(data.store_id);
    });
  }
}
