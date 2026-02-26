// src/database/models/ProductionArea.ts
import { Actor } from "@/types/actors";
import { Model } from "@nozbe/watermelondb";
import {
  field,
  immutableRelation
} from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";

export default class ProductionArea extends Model {
  static table = "production_areas";

  static associations: Associations = {
    actors: { type: "belongs_to", key: "actor_id" },
  };

  @field("server_id") serverId!: string;
  @field("server_updated_at") serverUpdatedAt?: number;

  @field("name") name!: string;
  @field("code") code!: string;
  @field("actor_id") actorId!: string;
  @field("latitude") latitude!: string;
  @field("longitude") longitude!: string;
  @field("address") address!: string;
  @field("photo") photo?: string;
  @field("updated_by") updatedBy!: string;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  @immutableRelation("actors", "actor_id") actor!: Actor;

  async updateFromServer(data: any) {
    await this.update((record) => {
      record.serverId = String(data.id);
      record.serverUpdatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : undefined;

      record.name = data.name;
      record.code = data.code;
      record.actorId = String(data.actor_id);
      record.latitude = data.latitude;
      record.longitude = data.longitude;
      record.address = data.address;
      record.photo = data.photo;
      record.updatedBy = data.updated_by;

      record.createdAt = new Date(data.created_at).getTime();
      record.updatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : new Date().getTime();
    });
  }
}
