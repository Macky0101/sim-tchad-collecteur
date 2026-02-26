import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabBarProps as NavigationBottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Couleurs constantes
const PRIMARY = "#0f7b5f";
const INACTIVE = "#94a3b8";

// Configuration des icônes par route
const ICON_MAP: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  index: "home",
  profile: "person",
};

interface BottomTabBarProps extends NavigationBottomTabBarProps {
  onAddPress?: () => void;
}

export function BottomTabBar({
  state,
  descriptors,
  navigation,
  onAddPress,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);

  // On suppose qu'il y a exactement deux routes : index et profile.
  // Si l'ordre est différent, on peut les identifier par leur nom.
  const homeRoute = state.routes.find((r) => r.name === "index")!;
  const profileRoute = state.routes.find((r) => r.name === "profile")!;

  const renderTab = (route: any, isFocused: boolean) => {
    const { options } = descriptors[route.key];
    const label =
      options.title ?? (route.name === "index" ? "Accueil" : "Profil");
    const color = isFocused ? PRIMARY : INACTIVE;
    const iconName = ICON_MAP[route.name] ?? "help-outline";

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <TouchableOpacity
        key={route.key}
        onPress={onPress}
        style={styles.tabItem}
        activeOpacity={0.7}
      >
        <MaterialIcons name={iconName} size={26} color={color} />
        <Text
          numberOfLines={1}
          style={[
            styles.tabLabel,
            { color, fontWeight: isFocused ? "700" : "500" },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const isHomeFocused =
    state.index === state.routes.findIndex((r) => r.name === "index");
  const isProfileFocused =
    state.index === state.routes.findIndex((r) => r.name === "profile");

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      {/* Barre principale avec deux onglets équilibrés */}
      <View style={styles.bar}>
        {/* Onglet gauche (Accueil) */}
        <View style={styles.side}>{renderTab(homeRoute, isHomeFocused)}</View>

        {/* Onglet droit (Profil) */}
        <View style={styles.side}>
          {renderTab(profileRoute, isProfileFocused)}
        </View>
      </View>

      {/* Bouton central flottant (absolu) */}
      <View style={styles.plusContainer}>
        <TouchableOpacity
          onPress={onAddPress}
          style={styles.plusButton}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add" size={34} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.06)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  side: {
    flex: 1, // Chaque côté prend 50% de la largeur
    alignItems: "center", // Centre le contenu horizontalement
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 3,
  },
  plusContainer: {
    position: "absolute",
    top: -32,
    left: "50%",
    marginLeft: -32, // Moitié de la largeur du bouton
    zIndex: 110,
  },
  plusButton: {
    width: 64,
    height: 64,
    backgroundColor: PRIMARY,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowColor: PRIMARY,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 14,
      },
    }),
  },
});
