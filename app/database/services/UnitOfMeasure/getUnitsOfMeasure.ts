import { database } from "@/app/database";
import { UnitOfMeasure } from "@/types/unitsOfMeasure";
import { Q } from "@nozbe/watermelondb";

export const getUnitsOfMeasure = async (): Promise<UnitOfMeasure[]> => {
  try {
    const collection = database.get("units_of_measure");
    const units = await collection.query(Q.sortBy("name", Q.asc)).fetch();

    return units.map((unit) => ({
      id: unit.id,
      name: unit.name,
      code: unit.code,
      created_at: unit.created_at,
      updated_at: unit.updated_at,
    }));
  } catch (error) {
    console.error("Erreur getUnitsOfMeasure:", error);
    return [];
  }
};
