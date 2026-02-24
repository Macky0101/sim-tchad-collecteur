import { Store } from "@/types/stores";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7; // largeur de la carte horizontale

interface StoreCardProps {
  store: Store;
  onPress: () => void;
}

export const StoreCard = ({ store, onPress }: StoreCardProps) => {
  const lat = parseFloat(store.latitude);
  const lng = parseFloat(store.longitude);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mr-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      style={{ width: CARD_WIDTH }}
    >
      {/* Mini‑carte */}
      <View style={{ height: 100, width: "100%" }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          mapType="hybrid"
        >
          <Marker
            coordinate={{ latitude: lat, longitude: lng }}
            pinColor="#E11D48"
          />
        </MapView>
        <View className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded">
          <Text className="text-white text-[10px] font-medium">SAT</Text>
        </View>
      </View>

      {/* Informations */}
      <View className="p-3">
        <Text className="text-base font-bold text-gray-900">{store.name}</Text>
        <Text className="mt-1 text-xs text-gray-600" numberOfLines={2}>
          {store.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
