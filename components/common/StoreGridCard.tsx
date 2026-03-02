import { Store } from "@/types/stores";
import { MaterialIcons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

interface StoreGridCardProps {
  store: Store;
  onPress: () => void;
  onEdit?: (store: Store) => void;
  onDelete?: (store: Store) => void;
}

export const StoreGridCard = ({
  store,
  onPress,
  onEdit,
  onDelete,
}: StoreGridCardProps) => {
  const lat = parseFloat(store.latitude);
  const lng = parseFloat(store.longitude);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const loadHtml = async () => {
      try {
        const path = require("../../assets/leaflet.html");
        const asset = Asset.fromModule(path);
        await asset.downloadAsync();
        const content = await FileSystem.readAsStringAsync(asset.localUri!);
        setHtmlContent(content);
      } catch (error) {
        console.error("Erreur Leaflet:", error);
        // Fallback HTML simple
        setHtmlContent(`
          <!DOCTYPE html>
          <html>
          <head>
              <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
              <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
              <style>html,body,#map{height:100%;margin:0}</style>
          </head>
          <body>
              <div id="map"></div>
              <script>
                  const map = L.map('map').setView([${lat}, ${lng}], 16);
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                  L.marker([${lat}, ${lng}]).addTo(map);
                  map.dragging.disable(); map.touchZoom.disable();
              </script>
          </body>
          </html>
        `);
      }
    };
    loadHtml();
  }, [lat, lng]);

  const mapData = {
    center: { lat, lng },
    zoom: 16,
    layers: [
      {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: "© OpenStreetMap",
      },
    ],
    markers: [
      {
        position: { lat, lng },
        icon: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      },
    ],
  };

  const handleOptionsPress = () => {
    Alert.alert(
      "Options",
      "Que voulez-vous faire ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Modifier", onPress: () => onEdit?.(store) },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            Alert.alert("Confirmation", `Supprimer "${store.name}" ?`, [
              { text: "Annuler", style: "cancel" },
              {
                text: "Supprimer",
                style: "destructive",
                onPress: () => onDelete?.(store),
              },
            ]);
          },
        },
      ],
      { cancelable: true },
    );
  };

  if (!htmlContent) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="overflow-hidden rounded-lg border border-gray-200 bg-white relative"
      >
        <View
          style={{
            height: 120,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
          }}
        >
          <Text>Carte...</Text>
        </View>
        {/* Boutons et infos identiques */}
        <TouchableOpacity
          onPress={handleOptionsPress}
          className="absolute top-2 left-2 bg-black/50 rounded-full p-1.5"
          style={{ zIndex: 10 }}
        >
          <MaterialIcons name="more-vert" size={18} color="white" />
        </TouchableOpacity>
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
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white relative"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View style={{ height: 120, width: "100%" }}>
        <WebView
          source={{ html: htmlContent }}
          style={{ flex: 1 }}
          scalesPageToFit={false}
          scrollEnabled={false}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          injectedJavaScript={`
            (function() {
              if (window.initMap) {
                window.initMap(${JSON.stringify(mapData)});
              }
            })();
            true;
          `}
          onMessage={(event) => console.log("Leaflet:", event.nativeEvent.data)}
        />
        <View className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded">
          <Text className="text-white text-[10px] font-medium">SAT</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleOptionsPress}
        className="absolute top-2 left-2 bg-black/50 rounded-full p-1.5"
        style={{ zIndex: 10 }}
      >
        <MaterialIcons name="more-vert" size={18} color="white" />
      </TouchableOpacity>

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
