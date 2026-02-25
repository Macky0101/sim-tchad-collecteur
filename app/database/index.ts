import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { Platform } from "react-native";
import migrations from "./migrations";
import Actor from "./models/Actor";
import Category from "./models/Category";
import Currency from "./models/Currency";
import Product from "./models/Product";
import ProductionArea from "./models/ProductionArea";
import ProductType from "./models/ProductType";
import Sector from "./models/Sector";
import Settings from "./models/Settings";
import Speculation from "./models/Speculation";
import Store from "./models/Store";
import TypeActor from "./models/TypeActor";
import UnitOfMeasure from "./models/UnitOfMeasure";
import schema from "./schema";

const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: Platform.OS === "ios",
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    Actor,
    Sector,
    Category,
    Speculation,
    Store,
    Currency,
    ProductionArea,
    ProductType,
    Settings,
    TypeActor,
    UnitOfMeasure,
    Product,
  ],
});
