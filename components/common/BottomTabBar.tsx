// ─────────────────────────────────────────────────────────────────────
// BottomTabBar.tsx — Floating, transparent bottom tab bar
// React Native + Expo Router + NativeWind (className)
// ─────────────────────────────────────────────────────────────────────
//
// Usage in app/(tabs)/_layout.tsx:
//
//   import { Tabs } from "expo-router";
//   import { BottomTabBar } from "@/components/common/BottomTabBar";
//
//   export default function TabLayout() {
//     return (
//       <Tabs
//         tabBar={(props) => <BottomTabBar {...props} />}
//         screenOptions={{ headerShown: false }}
//       >
//         <Tabs.Screen name="index" options={{ title: "Home" }} />
//         <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
//         <Tabs.Screen name="store" options={{ title: "Store" }} />
//         <Tabs.Screen name="profile" options={{ title: "Profile" }} />
//       </Tabs>
//     );
//   }
// ─────────────────────────────────────────────────────────────────────

import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path, Rect } from "react-native-svg";

// ─── Icons ────────────────────────────────────────────────────────────

function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 21V12h6v9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function DashboardIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={3}
        width={8}
        height={8}
        rx={1}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x={13}
        y={3}
        width={8}
        height={8}
        rx={1}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x={3}
        y={13}
        width={8}
        height={8}
        rx={1}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x={13}
        y={13}
        width={8}
        height={8}
        rx={1}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function StoreIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7h16v2H4z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 9v10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 9v10"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 19h16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 9v6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 9v6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ProfileIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={8}
        r={4}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 20c0-4 3.5-7 7-7s7 3 7 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Map route names to icons (supports both "index" and "home")
const ICON_MAP: Record<string, React.FC<{ color: string }>> = {
  index: HomeIcon,
  home: HomeIcon,
  dashboard: DashboardIcon,
  store: StoreIcon,
  profile: ProfileIcon,
};

// ─── Floating BottomTabBar Component ──────────────────────────────────

export function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom, 12);

  return (
    <View
      style={[styles.floatingWrapper, { bottom: bottomOffset }]}
      className="absolute left-0 right-0 items-center"
      pointerEvents="box-none"
    >
      <View
        style={styles.pillShadow}
        className="flex-row items-center gap-2 rounded-full bg-white/90 px-4 py-3"
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;

          const IconComponent = ICON_MAP[route.name] ?? HomeIcon;
          const iconColor = isFocused ? "#ffffff" : "#0f7b5f";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              className={
                isFocused
                  ? "flex-row items-center gap-2 rounded-full bg-[#0f7b5f] px-5 py-3"
                  : "items-center rounded-full bg-[#f0f0f0] p-3"
              }
            >
              <IconComponent color={iconColor} />
              {isFocused && (
                <Text className="text-sm font-semibold text-white">
                  {label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

// StyleSheet for properties NativeWind can't handle (position, shadow)
const styles = StyleSheet.create({
  floatingWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
  },
  pillShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
