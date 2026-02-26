import { Model } from "@nozbe/watermelondb";
import {
  field,
  immutableRelation
} from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";
import Sector from "./Sector";

export default class Category extends Model {
  static table = "categories";

  static associations: Associations = {
    sectors: { type: "belongs_to", key: "sector_id" },
  };

  @field("server_id") serverId!: string;
  @field("server_updated_at") serverUpdatedAt?: number;

  @field("name") name!: string;
  @field("description") description!: string;
  @field("code") code!: string;
  @field("sector_id") sectorId!: string;
  @field("is_active") isActive!: number;
  @field("updated_by") updatedBy?: string;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  // Relation typée
  @immutableRelation("sectors", "sector_id") sector!: Sector;

  async updateFromServer(data: any) {
    await this.update((record) => {
      record.serverId = String(data.id);
      record.serverUpdatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : undefined;

      record.name = data.name;
      record.description = data.description;
      record.code = data.code;
      record.sectorId = String(data.sector_id);
      record.isActive = data.is_active ? 1 : 0;
      record.updatedBy = data.updated_by;

      record.createdAt = new Date(data.created_at).getTime();
      record.updatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : new Date().getTime();
    });
  }
}
