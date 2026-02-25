import { database } from "@/app/database";
import { useDatabase } from "@/app/providers/DatabaseProvider";
import {
  ChevronRight,
  LayoutDashboard,
  LucideIcon,
  Package,
  RefreshCcw,
  ShoppingCart,
  Users,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

interface StatCardProps {
  title: string;
  count: number | string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const StatCard = ({
  title,
  count,
  icon: Icon,
  color,
  bgColor,
}: StatCardProps) => (
  <View className="w-1/2 p-2">
    <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 items-center">
      <View className={`${bgColor} p-3 rounded-full mb-3`}>
        <Icon size={24} color={color} />
      </View>
      <Text className="text-2xl font-bold text-gray-800">{count}</Text>
      <Text className="text-xs text-gray-500 font-medium text-center">
        {title}
      </Text>
    </View>
  </View>
);

export default function HomeScreen() {
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
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-[#0f7b5f] pt-14 pb-8 px-6 rounded-b-[40px] shadow-lg">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white/70 text-sm font-medium">
              Tableau de bord
            </Text>
            <Text className="text-white text-2xl font-bold">SIM TCHAD</Text>
          </View>
          <Pressable
            onPress={handleManualSync}
            disabled={refreshing}
            className="bg-white/20 p-3 rounded-full active:opacity-70"
          >
            {refreshing ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <RefreshCcw size={20} color="white" />
            )}
          </Pressable>
        </View>

        <View className="bg-white/10 p-4 rounded-2xl flex-row items-center">
          <View className="bg-white/20 p-2 rounded-lg mr-4">
            <LayoutDashboard size={20} color="white" />
          </View>
          <Text className="text-white text-base">
            Bienvenue dans votre espace collecteur
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 -mt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap mb-6">
          <StatCard
            title="Produits"
            count={stats.products}
            icon={Package}
            color="#0f7b5f"
            bgColor="bg-teal-50"
          />
          <StatCard
            title="Acteurs"
            count={stats.actors}
            icon={Users}
            color="#3b82f6"
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Entrepôts"
            count={stats.stores}
            icon={ShoppingCart}
            color="#f59e0b"
            bgColor="bg-amber-50"
          />
          <StatCard
            title="Catégories"
            count={stats.categories}
            icon={LayoutDashboard}
            color="#6366f1"
            bgColor="bg-indigo-50"
          />
        </View>

        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4 px-2">
            <Text className="text-lg font-bold text-gray-800">
              Actions rapides
            </Text>
          </View>

          <Pressable className="bg-white rounded-2xl p-4 mb-3 flex-row items-center border border-gray-100 shadow-sm active:opacity-70">
            <View className="bg-teal-100 p-3 rounded-xl mr-4">
              <Package size={22} color="#0f7b5f" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-800 font-bold">
                Ajouter un produit
              </Text>
              <Text className="text-gray-500 text-xs mt-0.5">
                Mettre à jour le stock local
              </Text>
            </View>
            <ChevronRight size={20} color="#cbd5e1" />
          </Pressable>

          <Pressable className="bg-white rounded-2xl p-4 mb-3 flex-row items-center border border-gray-100 shadow-sm active:opacity-70">
            <View className="bg-blue-100 p-3 rounded-xl mr-4">
              <Users size={22} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-800 font-bold">Liste des acteurs</Text>
              <Text className="text-gray-500 text-xs mt-0.5">
                Gérer les types d'acteurs
              </Text>
            </View>
            <ChevronRight size={20} color="#cbd5e1" />
          </Pressable>
        </View>

        <View className="items-center pb-10">
          <Text className="text-gray-400 text-xs">
            Version 1.0.2 - SIM TCHAD
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
