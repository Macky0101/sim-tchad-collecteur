import { STORAGE_KEYS } from "@/constants/storage";
import { ActorProvider } from "@/contexts/actors";
import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { useAuth } from "@/contexts/auth/useAuth";
import { DataProvider } from "@/contexts/Data";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";
import "./global.css";
import { DatabaseProvider } from "./providers/DatabaseProvider";

export const unstable_settings = {
  anchor: "(tabs)",
};

function NavigationGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // null = décision pas encore prise → spinner affiché
  const [navigationDecision, setNavigationDecision] = useState<
    "onboarding" | "tabs" | null
  >(null);

  // ── Décision initiale : attend que auth ET onboarding soient vérifiés ──
  // Se déclenche une seule fois quand authLoading passe à false
  useEffect(() => {
    if (authLoading) return;

    const decide = async () => {
      const value = await SecureStore.getItemAsync(
        STORAGE_KEYS.onboardingCompleted,
      );
      const onboardingDone = value === "true";

      if (!onboardingDone) {
        setNavigationDecision("onboarding");
      } else {
        setNavigationDecision("tabs");
      }
    };

    decide();
  }, [authLoading]);

  // ── Appliquer la décision initiale ─────────────────────────────────────
  useEffect(() => {
    if (!navigationDecision) return;

    if (navigationDecision === "tabs") {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/welcome");
    }
  }, [navigationDecision]);

  // ── Surveiller les changements en cours de session ─────────────────────
  // Gère seulement la connexion → tabs (pas la déconnexion forcée)
  useEffect(() => {
    if (!navigationDecision) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    }
    // On retire la partie qui force le redirect vers login si !isAuthenticated dans tabs
    // Car on veut permettre l'accès aux tabs sans auth
  }, [isAuthenticated, segments]);

  // ── Bloquer tout rendu tant que la décision n'est pas prise ───────────
  if (!navigationDecision) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#0f7b5f" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <DatabaseProvider>
        <ActorProvider>
          <DataProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <NavigationGuard>
                <Stack
                  screenOptions={{ headerShown: false, animation: "fade" }}
                >
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen
                    name="modal"
                    options={{ presentation: "modal", title: "Modal" }}
                  />
                </Stack>
              </NavigationGuard>
              <StatusBar style="auto" />
            </ThemeProvider>
          </DataProvider>
        </ActorProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}
