import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Sector extends Model {
  static table = "sectors";

  @field("server_id") serverId!: string;
  @field("server_updated_at") serverUpdatedAt?: number;

  @field("name") name!: string;
  @field("description") description!: string;
  @field("code") code!: string;
  @field("is_active") isActive!: number;
  @field("updated_by") updatedBy?: string;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  async updateFromServer(data: any) {
    await this.update((record) => {
      record.serverId = String(data.id);
      record.serverUpdatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : undefined;

      record.name = data.name;
      record.description = data.description;
      record.code = data.code;
      record.isActive = data.is_active ?? 1;
      record.updatedBy = data.updated_by;

      record.createdAt = new Date(data.created_at).getTime();
      record.updatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : new Date().getTime();
    });
  }
}
