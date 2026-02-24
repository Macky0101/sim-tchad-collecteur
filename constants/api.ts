export const BASE_URL = "https://api.cosit-app.com";

export const ENDPOINTS = {
  auth: {
    login: "/api/actor/login",
    changePassword: (actorId: number | string) =>
      `/api/actor/changePassword/${actorId}`,
  },

  actors: {
    create: "/api/actor",
    list: "/api/actor",
    update: (id: number | string) => `/api/actor/${id}`,
    getOne: (id: number | string) => `/api/actor/${id}`,
    delete: (id: number | string) => `/api/actor/${id}`,
  },

  actorTypes: {
    create: "/api/actor_type",
    list: "/api/actor_type",
    getOne: (id: number | string) => `/api/actor_type/${id}`,
    update: (id: number | string) => `/api/actor_type/${id}`,
    delete: (id: number | string) => `/api/actor_type/${id}`,
  },

  sectors: {
    create: "/api/sector",
    list: "/api/sector",
    getOne: (id: number | string) => `/api/sector/${id}`,
    update: (id: number | string) => `/api/sector/${id}`,
    delete: (id: number | string) => `/api/sector/${id}`,
  },

  categories: {
    create: "/api/category",
    list: "/api/category",
    getOne: (id: number | string) => `/api/category/${id}`,
    update: (id: number | string) => `/api/category/${id}`,
    delete: (id: number | string) => `/api/category/${id}`,
  },

  speculations: {
    create: "/api/speculation",
    list: "/api/speculation",
    getOne: (id: number | string) => `/api/speculation/${id}`,
    update: (id: number | string) => `/api/speculation/${id}`,
    delete: (id: number | string) => `/api/speculation/${id}`,
  },

  stores: {
    create: "/api/store",
    list: "/api/store",
    getOne: (id: number | string) => `/api/store/${id}`,
    update: (id: number | string) => `/api/store/${id}`,
    delete: (id: number | string) => `/api/store/${id}`,
  },

  settings: {
    create: "/api/setting",
    list: "/api/setting",
    getOne: (id: number | string) => `/api/setting/${id}`,
    update: (id: number | string) => `/api/setting/${id}`,
    delete: (id: number | string) => `/api/setting/${id}`,
  },

  productionAreas: {
    create: "/api/production_area",
    list: "/api/production_area",
    getOne: (id: number | string) => `/api/production_area/${id}`,
    update: (id: number | string) => `/api/production_area/${id}`,
    delete: (id: number | string) => `/api/production_area/${id}`,
  },

  unitsOfMeasure: {
    create: "/api/unite_of_measure",
    list: "/api/unite_of_measure",
    getOne: (id: number | string) => `/api/unite_of_measure/${id}`,
    update: (id: number | string) => `/api/unite_of_measure/${id}`,
    delete: (id: number | string) => `/api/unite_of_measure/${id}`,
  },

  productTypes: {
    create: "/api/product_type",
    list: "/api/product_type",
    getOne: (id: number | string) => `/api/product_type/${id}`,
    update: (id: number | string) => `/api/product_type/${id}`,
    delete: (id: number | string) => `/api/product_type/${id}`,
    withAttributes: "/api/product_type_with_attributes",
    attributesByType: (typeId: number | string) =>
      `/api/attributes_by_product_type/${typeId}`,
  },

  products: {
    // create: "/api/product",
    update: (id: number | string) => `/api/product/${id}`,
    list: "/api/product",
    getOne: (id: number | string) => `/api/product/${id}`,
    delete: (id: number | string) => `/api/product/${id}`,
    sendWithImage: "/api/product", // même endpoint, autre payload (form-data avec image)
    byTypeWithAttributes: (typeId: number | string) =>
      `/api/products_by_type/${typeId}`,
    namesByIdStore: (storeId: number | string) =>
      `/api/product/namesProducts/${storeId}`,
  },

  languages: {
    create: "/api/language",
    list: "/api/language",
    getOne: (id: number | string) => `/api/language/${id}`,
    update: (id: number | string) => `/api/language/${id}`,
    delete: (id: number | string) => `/api/language/${id}`,
  },

  currencies: {
    create: "/api/currency",
    list: "/api/currency",
    getOne: (id: number | string) => `/api/currency/${id}`,
    update: (id: number | string) => `/api/currency/${id}`,
    delete: (id: number | string) => `/api/currency/${id}`,
  },
} as const;
