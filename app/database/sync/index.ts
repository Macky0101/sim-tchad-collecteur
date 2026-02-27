import { getAllCategoryService } from "@/services/category/getAll";
import { getAllCurrenciesService } from "@/services/currency/getAll";
import { getAllProductionAreasService } from "@/services/production_areas/getAll";
import { getAllProductTypesService } from "@/services/productTypes/getAll";
import { getAllSectorsService } from "@/services/sectors/getAll";
import { getAllSettingsService } from "@/services/settings/getAll";
import { getAllSpeculationsService } from "@/services/speculation/getAll";
import { getAllStoresService } from "@/services/stores/getAll";
import { GetTypeActorsService } from "@/services/typeActors/getAll";
import { getAllUnitsOfMeasureService } from "@/services/unitsOfMeasure/getAll";
import { syncCollection } from "./helpers";

export const syncAllMasterData = async () => {
  console.log("🔄 Sync master data en cours...");

  const collections = [
    // { name: "actors", service: GetActorsService },
    { name: "sectors", service: getAllSectorsService },
    { name: "categories", service: getAllCategoryService },
    { name: "speculations", service: getAllSpeculationsService },
    { name: "stores", service: getAllStoresService },
    // { name: "products", service: getAllProductsService },
    { name: "currencies", service: getAllCurrenciesService },
    { name: "production_areas", service: getAllProductionAreasService },
    { name: "product_types", service: getAllProductTypesService },
    { name: "settings", service: getAllSettingsService },
    { name: "type_actors", service: GetTypeActorsService },
    { name: "units_of_measure", service: getAllUnitsOfMeasureService },
  ];

  for (const col of collections) {
    try {
      await syncCollection(col.name, col.service);
    } catch (error) {
      console.warn(`⚠️ La collection "${col.name}" a échoué:`, error);
    }
  }

  console.log("✅ Sync terminé !");
};
