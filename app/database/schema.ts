// src/database/schema.ts
import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "actors",
      columns: [
        { name: "server_id", type: "string", isIndexed: true }, // ID du serveur
        { name: "actor", type: "string" },
        { name: "actor_sigle", type: "string" },
        { name: "email", type: "string" },
        { name: "phone", type: "string" },
        { name: "whatsapp", type: "string", isOptional: true },
        { name: "actor_type_id", type: "string" },
        { name: "is_active", type: "number" },
        { name: "headquarter_photo", type: "string", isOptional: true },
        { name: "logo", type: "string", isOptional: true },
        { name: "address", type: "string" },
        { name: "latitude", type: "string", isOptional: true },
        { name: "longitude", type: "string", isOptional: true },
        { name: "code", type: "string" },
        { name: "description", type: "string", isOptional: true },
        { name: "updated_by", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "sectors",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "code", type: "string" },
        { name: "is_active", type: "number" },
        { name: "updated_by", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "categories",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "code", type: "string" },
        { name: "sector_id", type: "string" }, // référence à sectors.server_id
        { name: "is_active", type: "number" },
        { name: "updated_by", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "speculations",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "code", type: "string" },
        { name: "category_id", type: "string" }, // référence à categories.server_id
        { name: "is_active", type: "number" },
        { name: "photo", type: "string", isOptional: true },
        { name: "updated_by", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "stores",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "code", type: "string" },
        { name: "description", type: "string" },
        { name: "is_active", type: "number" },
        { name: "actor_id", type: "string" }, // référence à actors.server_id
        { name: "latitude", type: "string" },
        { name: "longitude", type: "string" },
        { name: "address", type: "string" },
        { name: "phone", type: "string" },
        { name: "whatsapp", type: "string" },
        { name: "updated_by", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "products",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "code", type: "string" },
        { name: "description", type: "string" },
        { name: "product_type_id", type: "string" },
        { name: "speculation_id", type: "string" },
        { name: "unit_of_measure_id", type: "string" },
        { name: "production_area_id", type: "string" },
        { name: "actor_id", type: "string" },
        { name: "store_id", type: "string" },
        { name: "quantity", type: "number" },
        { name: "price", type: "number" },
        { name: "origin", type: "string" },
        { name: "shape", type: "string" },
        { name: "measure_used", type: "string" },
        { name: "photo", type: "string", isOptional: true },
        { name: "production_date", type: "number" },
        { name: "is_active", type: "number" },
        { name: "updated_by", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "currencies",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "code", type: "string" },
        { name: "symbol", type: "string" },
        { name: "exchange_rate", type: "string" },
        { name: "is_base_currency", type: "number" },
        { name: "is_active", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "production_areas",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "code", type: "string" },
        { name: "actor_id", type: "string" },
        { name: "latitude", type: "string" },
        { name: "longitude", type: "string" },
        { name: "address", type: "string" },
        { name: "photo", type: "string", isOptional: true },
        { name: "updated_by", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "product_types",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "code", type: "string" },
        { name: "description", type: "string" },
        { name: "is_active", type: "number" },
        { name: "updated_by", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "settings",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "organization_acronym", type: "string" },
        { name: "organization_name", type: "string" },
        { name: "system_acronym", type: "string" },
        { name: "system_name", type: "string" },
        { name: "system_description", type: "string" },
        { name: "system_slogan", type: "string" },
        { name: "system_logo", type: "string" },
        { name: "organization_address", type: "string" },
        { name: "organization_email", type: "string" },
        { name: "organization_phone", type: "string" },
        { name: "organization_whatsapp", type: "string" },
        { name: "organization_level_code", type: "string" },
        { name: "organization_locality", type: "string" },
        { name: "updated_by", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "type_actors",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "code", type: "string" },
        { name: "description", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),

    tableSchema({
      name: "units_of_measure",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "code", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "server_updated_at", type: "number", isOptional: true },
      ],
    }),
  ],
});
