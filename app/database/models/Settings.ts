// src/database/models/Settings.ts
import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Settings extends Model {
  static table = "settings";

  @field("server_id") serverId!: string;
  @field("server_updated_at") serverUpdatedAt?: number;

  @field("organization_acronym") organizationAcronym!: string;
  @field("organization_name") organizationName!: string;
  @field("system_acronym") systemAcronym!: string;
  @field("system_name") systemName!: string;
  @field("system_description") systemDescription!: string;
  @field("system_slogan") systemSlogan!: string;
  @field("system_logo") systemLogo!: string;
  @field("organization_address") organizationAddress!: string;
  @field("organization_email") organizationEmail!: string;
  @field("organization_phone") organizationPhone!: string;
  @field("organization_whatsapp") organizationWhatsapp!: string;
  @field("organization_level_code") organizationLevelCode!: string;
  @field("organization_locality") organizationLocality!: string;
  @field("updated_by") updatedBy!: string;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  async updateFromServer(data: any) {
    await this.update((record) => {
      record.serverId = String(data.id);
      record.serverUpdatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : undefined;

      record.organizationAcronym = data.organization_acronym;
      record.organizationName = data.organization_name;
      record.systemAcronym = data.system_acronym;
      record.systemName = data.system_name;
      record.systemDescription = data.system_description;
      record.systemSlogan = data.system_slogan;
      record.systemLogo = data.system_logo;
      record.organizationAddress = data.organization_address;
      record.organizationEmail = data.organization_email;
      record.organizationPhone = data.organization_phone;
      record.organizationWhatsapp = data.organization_whatsapp;
      record.organizationLevelCode = data.organization_level_code;
      record.organizationLocality = data.organization_locality;
      record.updatedBy = data.updated_by;

      record.createdAt = new Date(data.created_at).getTime();
      record.updatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : new Date().getTime();
    });
  }
}
