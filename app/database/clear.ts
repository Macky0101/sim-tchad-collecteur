// src/database/clear.ts
import { database } from "./index";

export const clearDatabase = async () => {
  await database.write(async () => {
    await database.unsafeResetDatabase();
  });
};
