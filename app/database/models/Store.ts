// src/database/models/Store.ts
import { Actor } from "@/types/actors";
import { Model } from "@nozbe/watermelondb";
import {
  field,
  immutableRelation,
  writer,
} from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";

export default class Store extends Model {
  static table = "stores";

  static associations: Associations = {
    actors: { type: "belongs_to", key: "actor_id" },
  };

  @field("server_id") serverId!: string;
  @field("server_updated_at") serverUpdatedAt?: number;

  @field("name") name!: string;
  @field("code") code!: string;
  @field("description") description!: string;
  @field("is_active") isActive!: number;
  @field("actor_id") actorId!: string;
  @field("latitude") latitude!: string;
  @field("longitude") longitude!: string;
  @field("address") address!: string;
  @field("phone") phone!: string;
  @field("whatsapp") whatsapp!: string;
  @field("updated_by") updatedBy!: string;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  @immutableRelation("actors", "actor_id") actor!: Actor;

  @writer
  async updateFromServer(data: any) {
    await this.update((record) => {
      record.serverId = String(data.id);
      record.serverUpdatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : undefined;

      record.name = data.name;
      record.code = data.code;
      record.description = data.description;
      record.isActive = data.is_active;
      record.actorId = String(data.actor_id);
      record.latitude = data.latitude;
      record.longitude = data.longitude;
      record.address = data.address;
      record.phone = data.phone;
      record.whatsapp = data.whatsapp;
      record.updatedBy = data.updated_by;

      record.createdAt = new Date(data.created_at).getTime();
      record.updatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : new Date().getTime();
    });
  }
}
