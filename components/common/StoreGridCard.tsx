import { Store } from "@/types/stores";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface StoreGridCardProps {
  store: Store;
  onPress: () => void;
}

export const StoreGridCard = ({ store, onPress }: StoreGridCardProps) => {
  const lat = parseFloat(store.latitude);
  const lng = parseFloat(store.longitude);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Mini‑carte */}
      <View style={{ height: 120, width: "100%" }}>
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
      <View
        className="p-3"
        style={{ height: 80, justifyContent: "space-between" }}
      >
        <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
          {store.name}
        </Text>
        <Text className="text-xs text-gray-600" numberOfLines={2}>
          {store.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
