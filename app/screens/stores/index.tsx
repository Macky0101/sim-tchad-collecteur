import { deleteStore } from "@/app/database/services/Store/deleteStore";
import { getStores } from "@/app/database/services/Store/getStores";
import { SearchBar } from "@/components/common/SearchBar";
import { StoreGridCard } from "@/components/common/StoreGridCard";
import { useTabBarHeight } from "@/hooks/use-tab-bar-height";
import { Store } from "@/types/stores";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  const [stores, setStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const tabBarHeight = useTabBarHeight();

  const loadStores = async () => {
    try {
      setLoading(true);
      const data = await getStores();
      setStores(data);
    } catch (error) {
      console.error("Erreur chargement magasins:", error);
      Alert.alert("Erreur", "Impossible de charger les magasins");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStores();
    }, []),
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStores();
    setRefreshing(false);
  };

  const handleDelete = async (storeId: string) => {
    try {
      await deleteStore(storeId);
      // Recharger après suppression
      await loadStores();
      Alert.alert("Succès", "Magasin supprimé");
    } catch (error) {
      Alert.alert("Erreur", "Impossible de supprimer le magasin");
    }
  };

  const handleEdit = (store: Store) => {
    // Naviguer vers l'écran d'édition (à créer)
    router.push({
      pathname: "/screens/stores/edit/[id]",
      params: { id: store.id },
    });
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading && !refreshing) {
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
        onClear={() => setSearchQuery("")}
      />

      <FlatList
        data={filteredStores}
        keyExtractor={(item) => `store-${item.id}`}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={handleRefresh}
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
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500">
              {searchQuery
                ? "Aucun magasin trouvé"
                : "Aucun magasin enregistré"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
