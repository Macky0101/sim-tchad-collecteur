import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { database } from "../database";
import { syncAllMasterData } from "../database/sync";

const DatabaseContext = createContext({ database, sync: syncAllMasterData });

export const DatabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await syncAllMasterData();
      setReady(true);
    };
    init();
  }, []);

  if (!ready) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-6">
        <ActivityIndicator size="large" color="#0f7b5f" />
        <Text className="mt-4 text-center text-lg font-medium text-gray-700">
          Initialisation de la base de données...
        </Text>
        <Text className="mt-2 text-center text-sm text-gray-500">
          Synchronisation de vos données locales en cours
        </Text>
      </View>
    );
  }

  return (
    <DatabaseContext.Provider value={{ database, sync: syncAllMasterData }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
