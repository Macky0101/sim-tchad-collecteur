import { GetActorsService } from "@/services/actors/getAll";
import { getAllCategoryService } from "@/services/category/getAll";
import { getAllCurrenciesService } from "@/services/currency/getAll";
import { getAllProductsService } from "@/services/product/getAll";
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

  const results = await Promise.allSettled([
    syncCollection("actors", GetActorsService),
    syncCollection("sectors", getAllSectorsService),
    syncCollection("categories", getAllCategoryService),
    syncCollection("speculations", getAllSpeculationsService),
    syncCollection("stores", getAllStoresService),
    syncCollection("products", getAllProductsService),
    syncCollection("currencies", getAllCurrenciesService),
    syncCollection("production_areas", getAllProductionAreasService),
    syncCollection("product_types", getAllProductTypesService),
    syncCollection("settings", getAllSettingsService),
    syncCollection("type_actors", GetTypeActorsService),
    syncCollection("units_of_measure", getAllUnitsOfMeasureService),
  ]);

  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length > 0) {
    console.warn(`⚠️ ${failed.length} collections ont échoué`);
  } else {
    console.log("✅ Sync terminé – zéro doublon garanti !");
  }
};
