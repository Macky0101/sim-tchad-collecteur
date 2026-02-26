import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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
const PRIMARY = "#13ec13";
const BG_LIGHT = "#f6f8f6";
const BG_DARK = "#102210";

export default function ProfileAndSyncScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // États simulés
  const [isOnline] = useState(false); // pour l'icône wifi_off
  const [pendingSyncCount] = useState(12);
  const [syncProgress] = useState(0); // 0%

  const handleSync = () => {
    Alert.alert("Synchronisation", "Lancement de la synchronisation...");
  };

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: () => {
          router.push("/(auth)/login");
        },
      },
    ]);
  };

  const navigateTo = (route: string) => {
    Alert.alert("Navigation", `Vers ${route}`);
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      {/* Header fixe */}
      <SafeAreaView
        edges={["top"]}
        className="bg-background-light/80 dark:bg-background-dark/80"
      >
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-primary/10">
          <View className="flex-row items-center gap-2">
            <MaterialIcons
              name={isOnline ? "wifi" : "wifi-off"}
              size={20}
              color="#64748b"
            />
            <Text className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Mode {isOnline ? "En ligne" : "Hors-ligne"}
            </Text>
          </View>
          <Text className="text-lg font-bold">Profil &amp; Sync</Text>
          <View style={{ width: 28 }} />
        </View>
      </SafeAreaView>

      {/* Contenu défilant */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Profil */}
        <View className="p-6 flex-col items-center">
          <View className="relative">
            <View className="w-32 h-32 rounded-full border-4 border-primary/20 p-1">
              <View className="w-full h-full rounded-full bg-primary/10 overflow-hidden">
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv0pXySvFTRuqQsRZ6PDnGE3dP94rXKwemZ5hYZ9opxA8H8R8AsGkCBffuaIe51QQ3F3zOZE4wXk603eBHT6X8JXwAYLRTDyBMMfC-hfs3aFWDhiiE2KKRGJRR-7gbFqST3R1rXGoDvbIgVZt_AKdradrrODeOyGvLedvSFhtYx_GMGCEfkDf0CC4DSIbX-WCo2QnOWgYQfDXjCWlvcBINn0j6yP_rOlHxRHCk64KKsNraKnC0xxVtMIXbAd1DpxXRPhjdsEXRiZw2",
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            </View>
            <View className="absolute bottom-1 right-1 bg-primary p-1.5 rounded-full border-2 border-background-light dark:border-background-dark">
              <MaterialIcons name="verified" size={12} color="white" />
            </View>
          </View>

          <View className="mt-4 items-center">
            <Text className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Moussa Ibrahim
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 font-medium">
              ID: CH-23548
            </Text>
            <View className="mt-2 flex-row items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <MaterialIcons name="location-on" size={14} color={PRIMARY} />
              <Text className="text-sm font-semibold text-primary ml-1">
                Collecteur - N'Djamena
              </Text>
            </View>
          </View>
        </View>

        {/* Section Synchronisation */}
        <View className="mx-4 mb-6 p-5 rounded-xl bg-white dark:bg-slate-900 border border-primary/10">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="sync" size={24} color={PRIMARY} />
              <Text className="font-bold text-lg">Synchronisation</Text>
            </View>
            <View className="px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/30">
              <Text className="text-xs font-bold text-amber-700 dark:text-amber-400">
                En attente
              </Text>
            </View>
          </View>

          <View className="space-y-4">
            <View className="flex-row justify-between items-end">
              <View>
                <Text className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  {pendingSyncCount}
                </Text>
                <Text className="text-sm text-slate-500">
                  Enregistrements non synchronisés
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-slate-400 mb-1 italic">
                  Dernière sync: Aujourd'hui, 08:30
                </Text>
              </View>
            </View>

            {/* Barre de progression */}
            <View className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
              <View
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${syncProgress}%` }}
              />
            </View>

            <TouchableOpacity
              onPress={handleSync}
              className="w-full bg-primary py-4 rounded-xl flex-row items-center justify-center gap-2"
            >
              <MaterialIcons name="cloud-upload" size={20} color="black" />
              <Text className="text-black font-bold">
                Lancer la synchronisation
              </Text>
            </TouchableOpacity>

            <Text className="text-[10px] text-center text-slate-400">
              Connectez-vous à internet pour synchroniser avec Sim Chad API
            </Text>
          </View>
        </View>

        {/* Paramètres du compte */}
        <View className="px-4">
          <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
            Compte &amp; Sécurité
          </Text>

          <TouchableOpacity
            onPress={() => navigateTo("Changer le mot de passe")}
            className="flex-row items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mb-2"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 items-center justify-center">
                <MaterialIcons name="lock" size={20} color="#475569" />
              </View>
              <Text className="font-medium">Changer le mot de passe</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateTo("Paramètres")}
            className="flex-row items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 items-center justify-center">
                <MaterialIcons name="settings" size={20} color="#475569" />
              </View>
              <Text className="font-medium">Paramètres de l'application</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            className="w-full flex-row items-center gap-3 p-4 rounded-xl mt-4"
          >
            <View className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 items-center justify-center">
              <MaterialIcons name="logout" size={20} color="#ef4444" />
            </View>
            <Text className="text-red-500 font-bold">Déconnexion</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="p-8 items-center">
          <Text className="text-xs text-slate-400">
            Version 2.4.1 (Build 1029)
          </Text>
          <Text className="text-xs text-slate-400 mt-1">
            Sim Chad System © 2024
          </Text>
        </View>
      </ScrollView>

      {/* Barre de navigation inférieure */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 pt-3 flex-row justify-between items-center"
        style={{ paddingBottom: insets.bottom + 8 }}
      >
        <TouchableOpacity
          onPress={() => navigateTo("Marchés")}
          className="flex-col items-center gap-1"
        >
          <MaterialIcons name="storefront" size={24} color="#94a3b8" />
          <Text className="text-[10px] font-bold text-slate-400">Marchés</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo("Saisie")}
          className="flex-col items-center gap-1"
        >
          <MaterialIcons name="edit-note" size={24} color="#94a3b8" />
          <Text className="text-[10px] font-bold text-slate-400">Saisie</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo("Rapports")}
          className="flex-col items-center gap-1"
        >
          <MaterialIcons name="analytics" size={24} color="#94a3b8" />
          <Text className="text-[10px] font-bold text-slate-400">Rapports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo("Profil")}
          className="flex-col items-center gap-1"
        >
          <MaterialIcons
            name="person"
            size={24}
            color={PRIMARY}
            style={{ fontWeight: "bold" }}
          />
          <Text className="text-[10px] font-bold text-primary">Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
