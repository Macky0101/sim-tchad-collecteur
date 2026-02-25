import { createCategoryService } from "@/services/category/create";
import { deleteCategoryService } from "@/services/category/delete";
import { getAllCategoryService } from "@/services/category/getAll";
import { getOneCategoryService } from "@/services/category/getOne";
import { updateCategoryService } from "@/services/category/update";
import { getAllCurrenciesService } from "@/services/currency/getAll";
import { createProductService } from "@/services/product/create";
import { deleteProductService } from "@/services/product/delete";
import { getAllProductsService } from "@/services/product/getAll";
import { getProductsByTypeService } from "@/services/product/getByTypeWithAttributes";
import { getProductNamesByStoreService } from "@/services/product/getNamesByStore";
import { getOneProductService } from "@/services/product/getOne";
import { updateProductService } from "@/services/product/update";
import { createProductionAreaService } from "@/services/production_areas/create";
import { deleteProductionAreaService } from "@/services/production_areas/delete";
import { getAllProductionAreasService } from "@/services/production_areas/getAll";
import { getOneProductionAreaService } from "@/services/production_areas/getOne";
import { updateProductionAreaService } from "@/services/production_areas/update";
import { createSectorService } from "@/services/sectors/create";
import { deleteSectorService } from "@/services/sectors/delete";
import { getAllSectorsService } from "@/services/sectors/getAll";
import { getOneSectorService } from "@/services/sectors/getOne";
import { updateSectorService } from "@/services/sectors/update";
import { createSettingsService } from "@/services/settings/create";
import { deleteSettingsService } from "@/services/settings/delete";
import { getAllSettingsService } from "@/services/settings/getAll";
import { getOneSettingsService } from "@/services/settings/getOne";
import { updateSettingsService } from "@/services/settings/update";
import { createSpeculationService } from "@/services/speculation/create";
import { deleteSpeculationService } from "@/services/speculation/delete";
import { getAllSpeculationsService } from "@/services/speculation/getAll";
import { getOneSpeculationService } from "@/services/speculation/getOne";
import { updateSpeculationService } from "@/services/speculation/update";
import { createStoreService } from "@/services/stores/create";
import { deleteStoreService } from "@/services/stores/delete";
import { getAllStoresService } from "@/services/stores/getAll";
import { getOneStoreService } from "@/services/stores/getOne";
import { updateStoreService } from "@/services/stores/update";
import { getAllUnitsOfMeasureService } from "@/services/unitsOfMeasure/getAll";

import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types/category";
import { Currency } from "@/types/currency";
import { Product, UpdateProductRequest } from "@/types/product";
import {
  CreateProductionAreaRequest,
  ProductionArea,
  UpdateProductionAreaRequest,
} from "@/types/production_areas";
import { ProductType } from "@/types/productTypes";
import {
  CreateSectorRequest,
  Sector,
  UpdateSectorRequest,
} from "@/types/sectors";
import {
  CreateSettingsRequest,
  Settings,
  UpdateSettingsRequest,
} from "@/types/settings";
import {
  CreateSpeculationRequest,
  Speculation,
  UpdateSpeculationRequest,
} from "@/types/speculation";
import { CreateStoreRequest, Store, UpdateStoreRequest } from "@/types/stores";
import { UnitOfMeasure } from "@/types/unitsOfMeasure";

import { database } from "@/app/database";
import { syncCollection } from "@/app/database/sync/helpers";
import { getAllProductTypesService } from "@/services/productTypes/getAll";
import { GetTypeActorsService } from "@/services/typeActors/getAll";
import { typeActor } from "@/types/typeActor";
import { useState } from "react";
import { DataContext } from "./dataContext";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [speculations, setSpeculations] = useState<Speculation[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [settings, setSettings] = useState<Settings[]>([]);
  const [productionAreas, setProductionAreas] = useState<ProductionArea[]>([]);
  const [unitsOfMeasure, setUnitsOfMeasure] = useState<UnitOfMeasure[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [typeActors, setTypeActors] = useState<typeActor[]>([]);

  // ---------------------------------------------------------
  // pour la section secteur
  // ---------------------------------------------------------

  // const getAllSectors = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await getAllSectorsService();
  //     // console.log("Sectors response:", response);
  //     setSectors(response.data || []);
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getAllSectors = async () => {
    await syncCollection("sectors", getAllSectorsService); // ou juste syncAll si tu veux tout
    const sectors = await database.get("sectors").query().fetch();
    console.log("sectors", sectors);
    setSectors(data);
  };

  const getSectorById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOneSectorService(id);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createSector = async (data: CreateSectorRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createSectorService(data);
      setData(response.sector);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSector = async (data: UpdateSectorRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateSectorService(data);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSector = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteSectorService(id);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // pour la section categorie
  // ---------------------------------------------------------

  const getAllCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCategoryService();
      // console.log("Categories response:", response);
      setCategories(response.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOneCategoryService(id);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (data: CreateCategoryRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createCategoryService(data);
      setData(response.category);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (data: UpdateCategoryRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateCategoryService(data);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteCategoryService(id);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // pour la section speculation
  // ---------------------------------------------------------

  const getAllSpeculations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllSpeculationsService();
      // console.log("Speculations response:", response);
      setSpeculations(response.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSpeculationById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOneSpeculationService(id);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createSpeculation = async (data: CreateSpeculationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createSpeculationService(data);
      setData(response.speculation);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSpeculation = async (data: UpdateSpeculationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateSpeculationService(data);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSpeculation = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteSpeculationService(data.id);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // pour la section store
  // ---------------------------------------------------------

  const getAllStores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllStoresService();
      // console.log("Stores response:", response);
      setStores(response.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStoreById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOneStoreService(id);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createStore = async (data: CreateStoreRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createStoreService(data);
      setData(response.store);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStore = async (data: UpdateStoreRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateStoreService(data);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteStore = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteStoreService(data.id);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // pour la section settings
  // ---------------------------------------------------------

  const getAllSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllSettingsService();
      // console.log("Settings response:", response);
      setSettings(response.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSettingsById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOneSettingsService(id);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createSettings = async (data: CreateSettingsRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createSettingsService(data);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (data: UpdateSettingsRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateSettingsService(data);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteSettingsService(data.id);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // pour la section production areas
  // ---------------------------------------------------------

  const getAllProductionAreas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProductionAreasService();
      // console.log("Production areas response:", response);
      setProductionAreas(response.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductionAreaById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOneProductionAreaService(id);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createProductionArea = async (data: CreateProductionAreaRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createProductionAreaService(data);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProductionArea = async (data: UpdateProductionAreaRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateProductionAreaService(data);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProductionArea = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteProductionAreaService(data.id);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // pour la section units of measure
  // ---------------------------------------------------------

  const getAllUnitsOfMeasure = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUnitsOfMeasureService();
      // console.log("Units of measure response:", response);
      setUnitsOfMeasure(response.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const getUnitOfMeasureById = async (id: number) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await getOneUnitOfMeasureService(id);
  //     setData(response.data);
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const createUnitOfMeasure = async (data: CreateUnitOfMeasureRequest) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await createUnitOfMeasureService(data);
  //     setData(response.data);
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const updateUnitOfMeasure = async (data: UpdateUnitOfMeasureRequest) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await updateUnitOfMeasureService(data);
  //     setData(response);
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const deleteUnitOfMeasure = async (id: string) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await deleteUnitOfMeasureService(data.id);
  //     setData(response);
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  const getAllProductTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProductTypesService();
      setProductTypes(response.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // pour la section product
  // ---------------------------------------------------------

  const getAllProducts = async () => {
    console.log("Fetching all products...");
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProductsService();
      setProducts(response.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: number | string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOneProductService(id);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createProductService(formData);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (data: UpdateProductRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateProductService(data);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number | string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteProductService(id);
      setData(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByType = async (typeId: number | string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProductsByTypeService(typeId);
      setProducts(response.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductNamesByStore = async (storeId: number | string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProductNamesByStoreService(storeId);
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // pour la section currency
  // ---------------------------------------------------------

  const getAllCurrencies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCurrenciesService();
      console.log(response.Message);
      setCurrencies(response.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllTypeActors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await GetTypeActorsService();
      console.log("liste type actor", response);
      setTypeActors(response.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        sectors,
        categories,
        speculations,
        stores,
        settings,
        productionAreas,
        unitsOfMeasure,
        typeActors,
        getSectorById,
        createSector,
        updateSector,
        deleteSector,
        getAllSectors,
        // category
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
        getAllCategories,
        // speculation
        getSpeculationById,
        createSpeculation,
        updateSpeculation,
        deleteSpeculation,
        getAllSpeculations,
        // store
        getStoreById,
        createStore,
        updateStore,
        deleteStore,
        getAllStores,
        // settings
        getSettingsById,
        createSettings,
        updateSettings,
        deleteSettings,
        getAllSettings,
        // production areas
        getProductionAreaById,
        createProductionArea,
        updateProductionArea,
        deleteProductionArea,
        getAllProductionAreas,
        // units of measure
        // getUnitOfMeasureById,
        // createUnitOfMeasure,
        // updateUnitOfMeasure,
        // deleteUnitOfMeasure,
        getAllUnitsOfMeasure,
        // productTypes
        productTypes,
        getAllProductTypes,
        // product
        products: products,
        getProductById: getProductById,
        createProduct: createProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct,
        getAllProducts: getAllProducts,
        getProductsByType: getProductsByType,
        getProductNamesByStore: getProductNamesByStore,
        // currency
        currencies,
        getAllCurrencies,
        // typeActors
        getAllTypeActors,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
