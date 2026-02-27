import { useTabBarHeight } from "@/hooks/use-tab-bar-height";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Circle, Svg } from "react-native-svg";
import { database } from "../../database";
import { useDatabase } from "../../providers/DatabaseProvider";

// Couleur principale
const PRIMARY = "#0f7b5f";

// Composant pour le cercle de progression
const ProgressCircle = ({ percentage }: { percentage: number }) => {
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <View className="relative items-center justify-center">
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Cercle de fond */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Cercle de progression */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={PRIMARY}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          fill="transparent"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-sm font-bold text-gray-900 dark:text-white">
          {percentage}%
        </Text>
      </View>
    </View>
  );
};

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";
  const tabBarHeight = useTabBarHeight();

  const { sync } = useDatabase();
  const [stats, setStats] = useState({
    products: 0,
    actors: 0,
    stores: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const pCount = await database.get("products").query().count;
      const aCount = await database.get("actors").query().count;
      const sCount = await database.get("stores").query().count;
      const cCount = await database.get("categories").query().count;
      const ptCount = await database.get("product_types").query().count;
      const uomCount = await database.get("units_of_measure").query().count;
      const specCount = await database.get("speculations").query().count;
      const paCount = await database.get("production_areas").query().count;
      const curCount = await database.get("currencies").query().count;
      const setCount = await database.get("settings").query().count;
      const taCount = await database.get("type_actors").query().count;

      setStats({
        products: pCount,
        actors: aCount,
        stores: sCount,
        categories: cCount,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleManualSync = async () => {
    setRefreshing(true);
    await sync();
    await fetchStats();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator color="#0f7b5f" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      >
        {/* Espacement haut */}
        <View className="h-6" />

        {/* Contenu principal avec largeur max centrée */}
        <View className="px-6 mx-auto w-full max-w-md">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-10">
            {/* Avatar avec statut */}
            <View className="relative">
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv0pXySvFTRuqQsRZ6PDnGE3dP94rXKwemZ5hYZ9opxA8H8R8AsGkCBffuaIe51QQ3F3zOZE4wXk603eBHT6X8JXwAYLRTDyBMMfC-hfs3aFWDhiiE2KKRGJRR-7gbFqST3R1rXGoDvbIgVZt_AKdradrrODeOyGvLedvSFhtYx_GMGCEfkDf0CC4DSIbX-WCo2QnOWgYQfDXjCWlvcBINn0j6yP_rOlHxRHCk64KKsNraKnC0xxVtMIXbAd1DpxXRPhjdsEXRiZw2",
                }}
                className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-800"
              />
              <View className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-800 items-center justify-center">
                <MaterialIcons name="check" size={10} color="white" />
              </View>
            </View>

            {/* Indicateur synchronisation et menu */}
            <View className="flex-row gap-3">
              <View className="h-11 px-4 flex-row items-center gap-2 rounded-2xl bg-white dark:bg-card-dark shadow-sm border border-primary/10">
                <MaterialIcons name="cloud-done" size={20} color={PRIMARY} />
                <Text className="text-[11px] font-bold text-primary uppercase">
                  Synchronisé
                </Text>
              </View>
              <TouchableOpacity className="w-11 h-11 items-center justify-center rounded-2xl bg-white dark:bg-card-dark shadow-sm">
                <MaterialIcons name="grid-view" size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Section compteur */}
          <View className="items-center mb-10">
            <View className="flex-row items-center gap-2 px-3 py-1.5 bg-white dark:bg-card-dark rounded-full shadow-sm mb-4">
              <View className="w-5 h-5 bg-primary rounded-full items-center justify-center">
                <Text className="text-[10px] text-black font-bold">TD</Text>
              </View>
              <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                SIM CHAD
              </Text>
            </View>
            <Text className="text-slate-500 dark:text-slate-400 font-medium mb-1 uppercase tracking-widest text-[11px]">
              Prix Collectés Aujourd'hui
            </Text>
            <View className="flex-row items-center justify-center gap-1">
              <Text className="text-7xl font-bold text-slate-900 dark:text-white">
                12
              </Text>
            </View>
            <View className="mt-4 items-center">
              <View className="flex-row items-center gap-1.5 text-primary mb-1">
                <MaterialIcons name="location-on" size={14} color={PRIMARY} />
                <Text className="text-sm font-bold text-primary">
                  Marché Central, N'Djaména
                </Text>
              </View>
              <Text className="text-[11px] text-slate-400 font-medium">
                Région de Chari-Baguirmi
              </Text>
            </View>
          </View>

          {/* Grille 3 boutons */}
          <View className="flex-row gap-4 mb-4">
            <TouchableOpacity
              onPress={() => router.push("/screens/form/product")}
              className="flex-1 bg-white dark:bg-card-dark p-4 rounded-[2rem] shadow-sm items-center aspect-square active:opacity-70"
            >
              <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mb-2">
                <MaterialIcons name="add-circle" size={24} color={PRIMARY} />
              </View>
              <Text className="text-[12px] font-bold text-slate-600 dark:text-slate-300">
                Nouvelle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white dark:bg-card-dark p-4 rounded-[2rem] shadow-sm items-center aspect-square active:opacity-70">
              <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mb-2">
                <MaterialIcons name="storefront" size={24} color={PRIMARY} />
              </View>
              <Text className="text-[12px] font-bold text-slate-600 dark:text-slate-300">
                Magasin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleManualSync}
              disabled={refreshing}
              className="flex-1 bg-white dark:bg-card-dark p-4 rounded-[2rem] shadow-sm items-center aspect-square active:opacity-70"
            >
              <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mb-2">
                {refreshing ? (
                  <ActivityIndicator size="small" color={PRIMARY} />
                ) : (
                  <MaterialIcons name="cloud-sync" size={24} color={PRIMARY} />
                )}
              </View>
              <Text className="text-[12px] font-bold text-slate-600 dark:text-slate-300">
                Sync
              </Text>
            </TouchableOpacity>
          </View>

          {/* Grille 2 boutons */}
          <View className="flex-row gap-4 mb-8">
            <TouchableOpacity
              onPress={() => router.push("/screens/historique")}
              className="flex-1 bg-white dark:bg-card-dark p-5 rounded-[2rem] shadow-sm flex-row items-center justify-between active:opacity-70"
            >
              <View>
                <Text className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Historique
                </Text>
                <View className="flex-row -space-x-2">
                  <View className="w-7 h-7 rounded-full bg-slate-100 dark:bg-zinc-800 items-center justify-center border-2 border-white dark:border-card-dark">
                    <MaterialIcons name="list-alt" size={14} color="#64748b" />
                  </View>
                  <View className="w-7 h-7 rounded-full bg-slate-200 dark:bg-zinc-700 items-center justify-center border-2 border-white dark:border-card-dark">
                    <Text className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                      +24
                    </Text>
                  </View>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#cbd5e1" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              className="flex-1 bg-white dark:bg-card-dark p-5 rounded-[2rem] shadow-sm flex-row items-center justify-between active:opacity-70"
            >
              <View>
                <Text className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Mon Profil
                </Text>
                <View className="flex-row gap-1.5">
                  <View className="w-7 h-7 rounded-lg bg-primary/10 items-center justify-center">
                    <MaterialIcons name="person" size={16} color={PRIMARY} />
                  </View>
                  <View className="w-7 h-7 rounded-lg bg-blue-500/10 items-center justify-center">
                    <MaterialIcons name="verified" size={16} color="#3b82f6" />
                  </View>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#cbd5e1" />
            </TouchableOpacity>
          </View>

          {/* Dernières saisies */}
          <View className="bg-white dark:bg-card-dark p-6 rounded-[2.5rem] shadow-sm">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-base font-bold text-slate-800 dark:text-white">
                Dernières Saisies
              </Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="text-xs font-bold text-primary">
                  Voir tout
                </Text>
                <MaterialIcons name="arrow-forward" size={14} color={PRIMARY} />
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-6">
              {/* Liste des produits */}
              <View className="flex-1 space-y-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950/30 items-center justify-center">
                    <MaterialIcons name="grain" size={20} color="#ea580c" />
                  </View>
                  <View>
                    <Text className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Maïs
                    </Text>
                    <Text className="text-[11px] font-semibold text-primary">
                      450 XAF{" "}
                      <Text className="text-slate-400 font-normal">/ kg</Text>
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-950/30 items-center justify-center">
                    <MaterialIcons name="eco" size={20} color="#16a34a" />
                  </View>
                  <View>
                    <Text className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Mil
                    </Text>
                    <Text className="text-[11px] font-semibold text-primary">
                      300 XAF{" "}
                      <Text className="text-slate-400 font-normal">/ kg</Text>
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/30 items-center justify-center">
                    <MaterialIcons name="pets" size={20} color="#dc2626" />
                  </View>
                  <View>
                    <Text className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Bétail (Ovin)
                    </Text>
                    <Text className="text-[11px] font-semibold text-primary">
                      25,000 XAF
                    </Text>
                  </View>
                </View>
              </View>

              {/* Cercle de progression */}
              <View className="items-center">
                <ProgressCircle percentage={30} />
                <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center mt-2">
                  Objectif de{"\n"}Collecte
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
