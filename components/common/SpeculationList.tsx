// components/common/HorizontalSpeculationList.tsx

import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

// Interface pour une spéculation (adaptée à tes données)
export interface Speculation {
  id: number;
  name: string;
  description?: string;
  photo: string;
  // ajoute d'autres champs si nécessaire
}

interface SpeculationCardProps {
  speculation: Speculation;
  onPress?: () => void;
}

const SpeculationCard = ({ speculation, onPress }: SpeculationCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="mr-3 items-center" // espacement horizontal entre les cartes
    >
      <View className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
        <Image
          source={{ uri: speculation.photo }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
      <Text className="mt-2 text-center text-xs mb-10 font-medium text-gray-800">
        {speculation.name}
      </Text>
    </Pressable>
  );
};

interface SpeculationListProps {
  speculations: Speculation[];
  onSpeculationPress?: (speculation: Speculation) => void;
}

export const SpeculationList = ({
  speculations,
  onSpeculationPress,
}: SpeculationListProps) => {
  return (
    <FlatList
      data={speculations}
      keyExtractor={(item) => `spec-${item.id}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
      renderItem={({ item }) => (
        <SpeculationCard
          speculation={item}
          onPress={
            onSpeculationPress ? () => onSpeculationPress(item) : undefined
          }
        />
      )}
    />
  );
};
