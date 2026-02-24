import { SearchBar } from "@/components/common/SearchBar";
import { StoreGridCard } from "@/components/common/StoreGridCard"; // Nouvel import
import { useData } from "@/contexts/Data/useData";
import { useTabBarHeight } from "@/hooks/use-tab-bar-height";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GAP = 5;
const PADDING_HORIZONTAL = 10;
const CARD_WIDTH = (SCREEN_WIDTH - PADDING_HORIZONTAL * 2 - GAP) / 2;

export default function StoresScreen() {
  const { stores, getAllStores, loading } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const tabBarHeight = useTabBarHeight();

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    getAllStores();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0f7b5f" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4">
        <Text className="text-2xl font-bold">Tous les magasins</Text>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Rechercher un magasin..."
        onSubmit={() => console.log("Recherche lancée :", searchQuery)}
        onClear={() => setSearchQuery("")}
      />

      <FlatList
        data={filteredStores}
        keyExtractor={(item) => `store-${item.id}`}
        numColumns={2}
        columnWrapperStyle={{
          gap: GAP,
          paddingHorizontal: PADDING_HORIZONTAL,
          marginBottom: GAP,
        }}
        renderItem={({ item }) => (
          <View style={{ width: CARD_WIDTH }}>
            <StoreGridCard
              store={item}
              onPress={() =>
                router.push({
                  pathname: "/screens/stores/[id]",
                  params: { id: item.id },
                })
              }
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
