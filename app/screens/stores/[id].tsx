import { getProductsByStoreId } from "@/app/database/services/Store/getProductsByStoreId";
import { getStoreById } from "@/app/database/services/Store/getStoreById";
import { MasonryProductList } from "@/components/common/ProductCard";
import { Product } from "@/types/product";
import { Store } from "@/types/stores";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";
import { WebView } from "react-native-webview";

// Icônes (identiques)
const ArrowLeftIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19l-7-7 7-7"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
      stroke="#0f7b5f"
      strokeWidth={1.5}
      fill="none"
    />
  </Svg>
);

const WhatsAppIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H12"
      stroke="#0f7b5f"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.2L3 21z"
      stroke="#0f7b5f"
      strokeWidth={1.5}
      fill="none"
    />
  </Svg>
);

const LocationIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="#0f7b5f"
      strokeWidth={1.5}
    />
    <Circle cx={12} cy={9} r={2.5} stroke="#0f7b5f" strokeWidth={1.5} />
  </Svg>
);

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // États pour vraies données
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapHtml, setMapHtml] = useState<string | null>(null);

  // Charger magasin + produits
  useEffect(() => {
    const loadStoreData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const storeData = await getStoreById(id);
        const productsData = await getProductsByStoreId(id);

        setStore(storeData);
        setProducts(productsData || []);

        // Préparer HTML Leaflet
        if (storeData?.latitude && storeData?.longitude) {
          const lat = parseFloat(storeData.latitude);
          const lng = parseFloat(storeData.longitude);
          setMapHtml(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                <style>
                    html,body,#map{height:100%;margin:0;padding:0;}
                    .leaflet-container{font:12px/1.5 Helvetica Neue,Arial,Helvetica,sans-serif;}
                </style>
            </head>
            <body>
                <div id="map"></div>
                <script>
                    const map = L.map('map').setView([${lat}, ${lng}], 15);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(map);
                    L.marker([${lat}, ${lng}]).addTo(map)
                        .bindPopup('Magasin')
                        .openPopup();
                    map.dragging.disable();
                    map.touchZoom.disable();
                    map.doubleClickZoom.disable();
                    map.scrollWheelZoom.disable();
                </script>
            </body>
            </html>
          `);
        }
      } catch (error) {
        console.error("Erreur chargement magasin:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStoreData();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0f7b5f" />
      </SafeAreaView>
    );
  }

  if (!store) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-600">Magasin non trouvé</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 rounded-lg bg-[#0f7b5f] px-6 py-2"
        >
          <Text className="text-white">Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const lat = parseFloat(store.latitude);
  const lng = parseFloat(store.longitude);

  const handleCall = () => Linking.openURL(`tel:${store.phone}`);
  const handleWhatsApp = () =>
    Linking.openURL(`https://wa.me/${store.whatsapp}`);
  const handleOpenMaps = () => {
    const url =
      Platform.OS === "ios"
        ? `maps:0,0?q=${lat},${lng}`
        : `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Grande carte Leaflet */}
        <View className="relative h-64 w-full">
          {mapHtml ? (
            <WebView
              source={{ html: mapHtml }}
              style={{ flex: 1 }}
              scalesPageToFit={false}
              scrollEnabled={false}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: "#f3f4f6",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Chargement carte...</Text>
            </View>
          )}

          {/* Bouton retour */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-4 top-4 rounded-full bg-black/50 p-2"
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
        </View>

        {/* Informations du magasin - IDENTIQUES */}
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-900">{store.name}</Text>
          <Text className="mt-1 text-sm text-gray-600">
            {store.description}
          </Text>

          {/* Adresse */}
          <View className="mt-4 flex-row items-center">
            <LocationIcon />
            <Text className="ml-2 flex-1 text-sm text-gray-700">
              {store.address}
            </Text>
          </View>

          {/* Boutons de contact */}
          <View className="mt-4 flex-row">
            {store.phone && (
              <TouchableOpacity
                onPress={handleCall}
                className="mr-4 flex-row items-center rounded-full bg-gray-100 px-4 py-2"
              >
                <PhoneIcon />
                <Text className="ml-2 text-sm text-[#0f7b5f]">Appeler</Text>
              </TouchableOpacity>
            )}
            {store.whatsapp && (
              <TouchableOpacity
                onPress={handleWhatsApp}
                className="flex-row items-center rounded-full bg-gray-100 px-4 py-2"
              >
                <WhatsAppIcon />
                <Text className="ml-2 text-sm text-[#0f7b5f]">WhatsApp</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Lien vers Maps */}
          <TouchableOpacity
            onPress={handleOpenMaps}
            className="mt-4 flex-row items-center justify-center rounded-lg border border-[#0f7b5f] py-3"
          >
            <Text className="text-base font-semibold text-[#0f7b5f]">
              Voir l'itinéraire
            </Text>
          </TouchableOpacity>

          <View className="my-6 h-px bg-gray-200" />

          <Text className="mb-4 text-xl font-bold">Produits disponibles</Text>
          <MasonryProductList
            products={products}
            onProductPress={(product) =>
              router.push({
                pathname: "/screens/products/[id]",
                params: {
                  id: product.id,
                  photo: product.photo,
                  name: product.name,
                  price: product.price,
                  description: product.description,
                  quantity: product.quantity,
                  measure_used: product.measure_used,
                  origin: product.origin,
                },
              })
            }
            onEndReached={() => {}}
            bottomPadding={40}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
