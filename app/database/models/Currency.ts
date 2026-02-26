import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Currency extends Model {
  static table = "currencies";

  @field("server_id") serverId!: string;
  @field("server_updated_at") serverUpdatedAt?: number;

  @field("name") name!: string;
  @field("code") code!: string;
  @field("symbol") symbol!: string;
  @field("exchange_rate") exchangeRate!: string;
  @field("is_base_currency") isBaseCurrency!: number;
  @field("is_active") isActive!: number;

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
      record.symbol = data.symbol;
      record.exchangeRate = data.exchange_rate;
      record.isBaseCurrency = data.is_base_currency;
      record.isActive = data.is_active;

      record.createdAt = new Date(data.created_at).getTime();
      record.updatedAt = data.updated_at
        ? new Date(data.updated_at).getTime()
        : new Date().getTime();
    });
  }
}
