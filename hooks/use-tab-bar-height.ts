import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Retourne la hauteur totale occupée par le BottomTabBar flottant.
 * À utiliser comme `paddingBottom` sur les ScrollView / listes des écrans tabs.
 *
 * Usage:
 *   const tabBarHeight = useTabBarHeight();
 *   <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight }}>
 */
export function useTabBarHeight(): number {
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom, 12);
  const pillHeight = 64; // py-3 (12*2) + icon 24 + gap ~= 64px
  const spacing = 12; // espace entre le bas de l'écran et le pill

  return bottomOffset + pillHeight + spacing;
}
