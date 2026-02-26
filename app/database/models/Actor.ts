import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Actor extends Model {
  static table = "actors";

  @field("server_id") serverId!: string;
  @field("server_updated_at") serverUpdatedAt?: number;

  @field("name") name!: string;
  @field("sigle") sigle!: string;
  @field("email") email!: string;
  @field("phone") phone!: string;
  @field("whatsapp") whatsapp?: string;
  @field("actor_type_id") actorTypeId!: string;
  @field("is_active") isActive!: number;
  @field("headquarter_photo") headquarterPhoto?: string;
  @field("logo") logo?: string;
  @field("address") address!: string;
  @field("latitude") latitude?: string;
  @field("longitude") longitude?: string;
  @field("code") code!: string;
  @field("description") description?: string;
  @field("updated_by") updatedBy?: string;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  async updateFromServer(data: any) {
    await this.update((record) => {
      record.serverId = String(data.id);
      record.serverUpdatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : undefined;

      record.name = data.actor;
      record.sigle = data.actor_sigle;
      record.email = data.email;
      record.phone = data.phone;
      record.whatsapp = data.whatsapp;
      record.actorTypeId = String(data.actor_type_id);
      record.isActive = data.is_active;
      record.headquarterPhoto = data.headquarter_photo;
      record.logo = data.logo;
      record.address = data.address;
      record.latitude = data.latitude?.toString();
      record.longitude = data.longitude?.toString();
      record.code = data.code;
      record.description = data.description;
      record.updatedBy = data.updated_by;

      record.createdAt = new Date(data.created_at).getTime();
      record.updatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : new Date().getTime();
    });
  }
}
