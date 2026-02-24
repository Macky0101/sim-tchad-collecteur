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
import { typeActor } from "@/types/typeActor";
import { UnitOfMeasure } from "@/types/unitsOfMeasure";

import { createContext } from "react";

export type DataContextType = {
  data: any;
  loading: boolean;
  error: string | null;
  sectors: Sector[];
  categories: Category[];
  speculations: Speculation[];
  stores: Store[];
  settings: Settings[];
  productionAreas: ProductionArea[];
  unitsOfMeasure: UnitOfMeasure[];
  productTypes: ProductType[];
  products: Product[];
  currencies: Currency[];
  typeActors: typeActor[];

  // sector
  getSectorById: (id: string) => Promise<void>;
  createSector: (data: CreateSectorRequest) => Promise<void>;
  updateSector: (data: UpdateSectorRequest) => Promise<void>;
  deleteSector: (id: string) => Promise<void>;
  getAllSectors: () => Promise<void>;
  // category
  getCategoryById: (id: string) => Promise<void>;
  createCategory: (data: CreateCategoryRequest) => Promise<void>;
  updateCategory: (data: UpdateCategoryRequest) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  getAllCategories: () => Promise<void>;
  // speculation
  getSpeculationById: (id: number) => Promise<void>;
  createSpeculation: (data: CreateSpeculationRequest) => Promise<void>;
  updateSpeculation: (data: UpdateSpeculationRequest) => Promise<void>;
  deleteSpeculation: (id: string) => Promise<void>;
  getAllSpeculations: () => Promise<void>;
  // store
  getStoreById: (id: number) => Promise<void>;
  createStore: (data: CreateStoreRequest) => Promise<void>;
  updateStore: (data: UpdateStoreRequest) => Promise<void>;
  deleteStore: (id: string) => Promise<void>;
  getAllStores: () => Promise<void>;
  // settings
  getSettingsById: (id: number) => Promise<void>;
  createSettings: (data: CreateSettingsRequest) => Promise<void>;
  updateSettings: (data: UpdateSettingsRequest) => Promise<void>;
  deleteSettings: (id: string) => Promise<void>;
  getAllSettings: () => Promise<void>;
  // production areas
  getProductionAreaById: (id: number) => Promise<void>;
  createProductionArea: (data: CreateProductionAreaRequest) => Promise<void>;
  updateProductionArea: (data: UpdateProductionAreaRequest) => Promise<void>;
  deleteProductionArea: (id: string) => Promise<void>;
  getAllProductionAreas: () => Promise<void>;
  // units of measure
  // getUnitOfMeasureById: (id: number) => Promise<void>;
  // createUnitOfMeasure: (data: CreateUnitOfMeasureRequest) => Promise<void>;
  // updateUnitOfMeasure: (data: UpdateUnitOfMeasureRequest) => Promise<void>;
  // deleteUnitOfMeasure: (id: string) => Promise<void>;
  getAllUnitsOfMeasure: () => Promise<void>;
  // productTypes
  getAllProductTypes: () => Promise<void>;
  // product
  getProductById: (id: number | string) => Promise<void>;
  createProduct: (formData: FormData) => Promise<void>;
  updateProduct: (data: UpdateProductRequest) => Promise<void>;
  deleteProduct: (id: number | string) => Promise<void>;
  getAllProducts: () => Promise<void>;
  getProductsByType: (typeId: number | string) => Promise<void>;
  getProductNamesByStore: (storeId: number | string) => Promise<void>;
  // currency
  getAllCurrencies: () => Promise<void>;
  //actor type
  getAllTypeActors: () => Promise<void>;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);
