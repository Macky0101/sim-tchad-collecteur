import { Store } from "@/types/stores";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { StoreCard } from "./StoreCard";

// Icône flèche droite (pour "Voir plus")
const ArrowRightIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14M12 5l7 7-7 7"
      stroke="#0f7b5f"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface StoreListHorizontalProps {
  stores: Store[];
  onSeeAllPress: () => void;
  onStorePress?: (store: Store) => void;
}

export const StoreListHorizontal = ({
  stores,
  onSeeAllPress,
  onStorePress,
}: StoreListHorizontalProps) => {
  // Afficher seulement les 5 premiers magasins
  const limitedStores = stores.slice(0, 5);

  return (
    <View className="mb-1 p-1">
      {/* En‑tête avec titre + bouton "Voir plus" */}
      <View className="flex-row items-center justify-between px-4 pb-2">
        {/* <Text className="text-lg font-bold">Magasins</Text> */}
        <Text className="text-lg font-bold"></Text>
        <TouchableOpacity
          onPress={onSeeAllPress}
          className="flex-row items-center"
        >
          <Text className="mr-1 text-sm font-semibold text-[#0f7b5f]">
            Voir plus
          </Text>
          <ArrowRightIcon />
        </TouchableOpacity>
      </View>

      {/* Liste horizontale des cartes magasins */}
      <FlatList
        data={limitedStores}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `store-${item.id}`}
        renderItem={({ item }) => (
          <StoreCard store={item} onPress={() => onStorePress?.(item)} />
        )}
        contentContainerStyle={{ paddingHorizontal: 5 }}
      />
    </View>
  );
};
