import ParallaxScrollView from "@/components/parallax-scroll-view"; // ton composant existant
import { useActor } from "@/contexts/actors";
import { useData } from "@/contexts/Data/useData";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

// ────────────────────────────────────────────────────────────────────────────
// Icônes (toutes avec la couleur verte #0f7b5f)
// ────────────────────────────────────────────────────────────────────────────
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

const CalendarIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
      stroke="#888"
      strokeWidth={1.5}
    />
    <Path d="M3 10h18M8 2v4M16 2v4" stroke="#888" strokeWidth={1.5} />
  </Svg>
);

const PackageIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L2 7v10l10 5 10-5V7l-10-5z"
      stroke="#0f7b5f"
      strokeWidth={1.5}
    />
    <Path d="M2 7l10 5 10-5M12 22V12" stroke="#0f7b5f" strokeWidth={1.5} />
  </Svg>
);

const StoreIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"
      stroke="#0f7b5f"
      strokeWidth={1.5}
    />
    <Path d="M9 22V12h6v10" stroke="#0f7b5f" strokeWidth={1.5} />
  </Svg>
);

// ────────────────────────────────────────────────────────────────────────────
// Helper pour trouver un libellé à partir d'un ID
// ────────────────────────────────────────────────────────────────────────────
const findName = (
  list: any[],
  id: number | null | undefined,
  defaultValue = "N/A",
): string => {
  if (!id) return defaultValue;
  const item = list.find((i) => i.id === id);
  return item ? item.name : defaultValue;
};

export default function DetailProduct() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = parseInt(id, 10);
  const {
    speculations,
    products,
    stores,
    productTypes,
    productionAreas,
    unitsOfMeasure,
    getAllSpeculations,
    getAllProducts,
    getAllStores,
    getAllProductTypes,
    getAllProductionAreas,
    getAllUnitsOfMeasure,
  } = useData();
  const { actor, GetActors } = useActor();
  // const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  useEffect(() => {
    getAllSpeculations();
    getAllProducts();
    getAllStores();
    getAllProductTypes();
    getAllProductionAreas();
    getAllUnitsOfMeasure();
    GetActors();
  }, []);

  // Sécurisation des listes
  const safeProductTypes = Array.isArray(productTypes) ? productTypes : [];
  const safeSpeculations = Array.isArray(speculations) ? speculations : [];
  const safeStores = Array.isArray(stores) ? stores : [];
  const safeProductionAreas = Array.isArray(productionAreas)
    ? productionAreas
    : [];
  const safeUnitsOfMeasure = Array.isArray(unitsOfMeasure)
    ? unitsOfMeasure
    : [];
  const safeActors = Array.isArray(actor) ? actor : actor ? [actor] : [];

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [productId],
  );

  if (!product) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-600">Produit non trouvé</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-6 rounded-lg bg-[#0f7b5f] px-6 py-2"
        >
          <Text className="text-white">Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Résolution des relations
  const productTypeName = findName(safeProductTypes, product.product_type_id);
  const speculationName = findName(safeSpeculations, product.speculation_id);
  const store = safeStores.find((s) => s.id === product.store_id);
  const productionArea = safeProductionAreas.find(
    (p) => p.id === product.production_area_id,
  );
  const unitName = findName(safeUnitsOfMeasure, product.unit_of_measure_id);
  const actorName = findName(safeActors, product.actor_id);

  // Fonctions de contact
  const handleCall = (phone: string) => Linking.openURL(`tel:${phone}`);
  const handleWhatsApp = (whatsapp: string) =>
    Linking.openURL(`https://wa.me/${whatsapp}`);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f0f0f0", dark: "#1a1a1a" }}
      headerImage={
        <View className="relative h-full w-full">
          <Image
            source={{ uri: product.photo as string }}
            className="h-full w-full"
            resizeMode="cover"
          />
          {/* Bouton retour superposé */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-4 top-10 rounded-full bg-black/50 p-2"
          >
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      }
    >
      {/* Contenu principal */}
      <View className=" pb-3">
        {/* Nom et prix */}
        <Text className="text-2xl font-bold text-gray-900">{product.name}</Text>
        <View className="mt-2 flex-row items-baseline">
          <Text className="text-xl font-bold text-[#0f7b5f]">
            {product.price}
          </Text>
          {product.quantity && (
            <Text className="ml-2 text-sm text-gray-500">
              Stock: {product.quantity} {unitName}
            </Text>
          )}
        </View>

        {/* Badges : origine et date */}
        {(product.origin || product.production_date) && (
          <View className="mt-4 flex-row flex-wrap gap-2">
            {product.origin && (
              <View className="flex-row items-center rounded-full bg-gray-100 px-3 py-1">
                <LocationIcon />
                <Text className="ml-1 text-xs text-gray-700">
                  {product.origin}
                </Text>
              </View>
            )}
            {product.production_date && (
              <View className="flex-row items-center rounded-full bg-gray-100 px-3 py-1">
                <CalendarIcon />
                <Text className="ml-1 text-xs text-gray-700">
                  {new Date(product.production_date).toLocaleDateString(
                    "fr-FR",
                  )}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Description */}
        <View className="mt-6">
          <Text className="text-base font-semibold text-gray-900">
            Description
          </Text>
          <Text className="mt-1 text-sm leading-5 text-gray-600">
            {product.description}
          </Text>
        </View>

        {/* Informations complémentaires */}
        <View className="mt-3 rounded-xl bg-gray-50 p-4">
          <Text className="mb-3 text-base font-semibold text-gray-900">
            Détails
          </Text>
          <View className="space-y-2">
            <InfoRow label="Type de produit" value={productTypeName} />
            <InfoRow label="Spéculation" value={speculationName} />
            <InfoRow label="Unité de mesure" value={unitName} />
            <InfoRow label="Forme / Conditionnement" value={product.shape} />
            <InfoRow label="Producteur / Fournisseur" value={actorName} />
          </View>
        </View>

        {/* Magasin */}
        {store && (
          <View className="mt-3 rounded-xl border border-gray-200 p-4">
            <View className="flex-row items-center">
              <StoreIcon />
              <Text className="ml-2 text-base font-semibold text-gray-900">
                Magasin de vente
              </Text>
            </View>
            <Text className="mt-2 text-sm text-gray-800">{store.name}</Text>
            {store.address && (
              <Text className="mt-1 text-xs text-gray-500">
                {store.address}
              </Text>
            )}
            <View className="mt-3 flex-row">
              {store.phone && (
                <TouchableOpacity
                  onPress={() => handleCall(store.phone)}
                  className="mr-4 flex-row items-center"
                >
                  <PhoneIcon />
                  <Text className="ml-1 text-xs text-[#0f7b5f]">Appeler</Text>
                </TouchableOpacity>
              )}
              {store.whatsapp && (
                <TouchableOpacity
                  onPress={() => handleWhatsApp(store.whatsapp)}
                  className="flex-row items-center"
                >
                  <WhatsAppIcon />
                  <Text className="ml-1 text-xs text-[#0f7b5f]">WhatsApp</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Zone de production */}
        {productionArea && (
          <View className="mt-4 rounded-xl border border-gray-200 p-4">
            <View className="flex-row items-center">
              <LocationIcon />
              <Text className="ml-2 text-base font-semibold text-gray-900">
                Zone de production
              </Text>
            </View>
            <Text className="mt-2 text-sm text-gray-800">
              {productionArea.name}
            </Text>
            {productionArea.address && (
              <Text className="mt-1 text-xs text-gray-500">
                {productionArea.address}
              </Text>
            )}
          </View>
        )}

        {/* Bouton d'action principal */}
        <TouchableOpacity
          className="mt-8 rounded-xl bg-[#0f7b5f] py-4"
          onPress={() => {
            // Action personnalisable : contacter, commander, etc.
            // Exemple : ouvrir une modale de contact
          }}
        >
          <Text className="text-center text-base font-bold text-white">
            Contacter le vendeur
          </Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

// Composant utilitaire pour une ligne d'information
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between">
    <Text className="text-sm text-gray-500">{label}</Text>
    <Text className="text-sm font-medium text-gray-900">{value}</Text>
  </View>
);
