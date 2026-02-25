import { Category } from "@/types/category";
import { Model } from "@nozbe/watermelondb";
import {
  field,
  immutableRelation,
  writer,
} from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";

export default class Speculation extends Model {
  static table = "speculations";

  static associations: Associations = {
    categories: { type: "belongs_to", key: "category_id" },
  };

  @field("server_id") serverId!: string;
  @field("server_updated_at") serverUpdatedAt?: number;

  @field("name") name!: string;
  @field("description") description!: string;
  @field("code") code!: string;
  @field("category_id") categoryId!: string;
  @field("is_active") isActive!: number;
  @field("photo") photo?: string;
  @field("updated_by") updatedBy!: string;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  @immutableRelation("categories", "category_id") category!: Category;

  @writer
  async updateFromServer(data: any) {
    await this.update((record) => {
      record.serverId = String(data.id);
      record.serverUpdatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : undefined;

      record.name = data.name;
      record.description = data.description;
      record.code = data.code;
      record.categoryId = String(data.category_id);
      record.isActive = data.is_active;
      record.photo = data.photo;
      record.updatedBy = data.updated_by;

      record.createdAt = new Date(data.created_at).getTime();
      record.updatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : new Date().getTime();
    });
  }
}
