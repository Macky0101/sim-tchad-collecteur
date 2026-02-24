import * as Haptics from "expo-haptics";

// Wrapper pour les retours haptiques (vibrations)
export const haptics = {
  // Impact léger (boutons, sélections)
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),

  // Impact moyen (actions importantes)
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),

  // Impact fort (actions critiques)
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),

  // Succès
  success: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),

  // Erreur
  error: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),

  // Avertissement
  warning: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),

  // Sélection (pour les listes, pickers)
  selection: () => Haptics.selectionAsync(),
};

// Hook personnalisé pour les haptics
export const useHaptics = () => {
  const trigger = (type: keyof typeof haptics) => {
    haptics[type]();
  };

  return { trigger };
};
