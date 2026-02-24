import { MasonryProductList, Product } from "@/components/common/ProductCard";
import { useData } from "@/contexts/Data/useData";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

// Icônes
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

// Données mockées (à remplacer par les données du contexte quand l'API sera prête)
const MOCK_STORES = [
  {
    id: 1,
    name: "Légumes frais",
    code: "1",
    description: "Légumes frais et de saison",
    is_active: 1,
    actor_id: 1,
    latitude: "12.1348",
    longitude: "15.0557",
    address: "Marché central, N'Djaména",
    phone: "123456789",
    whatsapp: "123456789",
    updated_by: "1",
    created_at: "2022-01-01",
    updated_at: "2022-01-01",
  },
  {
    id: 2,
    name: "Poisson frais",
    code: "2",
    description: "Poisson frais du Lac",
    is_active: 1,
    actor_id: 1,
    latitude: "12.1111",
    longitude: "15.0666",
    address: "Quartier Diguel, N'Djaména",
    phone: "987654321",
    whatsapp: "987654321",
    updated_by: "1",
    created_at: "2022-01-01",
    updated_at: "2022-01-01",
  },
  {
    id: 3,
    name: "Viande fraîche",
    code: "3",
    description: "Viande bovine et ovine",
    is_active: 1,
    actor_id: 1,
    latitude: "12.1500",
    longitude: "15.0333",
    address: "Abattoir, Farcha",
    phone: "555123456",
    whatsapp: "555123456",
    updated_by: "1",
    created_at: "2022-01-01",
    updated_at: "2022-01-01",
  },
];

const MOCK_PRODUCTS: Product[] = [
  // ... tes produits mockés (avec store_id correspondant)
];

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const storeId = parseInt(id, 10);
  const { products } = useData();

  // Trouver le magasin correspondant
  const store = useMemo(
    () => MOCK_STORES.find((s) => s.id === storeId),
    [storeId],
  );

  // Filtrer les produits appartenant à ce magasin
  const storeProducts = useMemo(() => {
    const source = products?.length ? products : MOCK_PRODUCTS;
    return source.filter((p) => p.store_id === storeId);
  }, [products, storeId]);

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
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Grande carte en haut */}
        <View className="relative h-64 w-full">
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker coordinate={{ latitude: lat, longitude: lng }} />
          </MapView>

          {/* Bouton retour */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-4 top-4 rounded-full bg-black/50 p-2"
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
        </View>

        {/* Informations du magasin */}
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

          {/* Lien vers Google Maps */}
          <TouchableOpacity
            onPress={handleOpenMaps}
            className="mt-4 flex-row items-center justify-center rounded-lg border border-[#0f7b5f] py-3"
          >
            <Text className="text-base font-semibold text-[#0f7b5f]">
              Voir l'itinéraire
            </Text>
          </TouchableOpacity>

          {/* Séparateur */}
          <View className="my-6 h-px bg-gray-200" />

          {/* Produits du magasin */}
          <Text className="mb-4 text-xl font-bold">Produits disponibles</Text>
          <MasonryProductList
            products={storeProducts}
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
