// src/database/models/UnitOfMeasure.ts
import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class UnitOfMeasure extends Model {
  static table = "units_of_measure";

  @field("server_id") serverId!: string;
  @field("server_updated_at") serverUpdatedAt?: number;

  @field("name") name!: string;
  @field("code") code!: string;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  async updateFromServer(data: any) {
    await this.update((record) => {
      record.serverId = String(data.id);
      record.serverUpdatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : undefined;

      record.name = data.name;
      record.code = data.code;

      record.createdAt = new Date(data.created_at).getTime();
      record.updatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : new Date().getTime();
    });
  }
}
