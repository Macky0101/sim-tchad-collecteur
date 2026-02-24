import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Composants internes pour les blocs de skeleton
const SkeletonBlock: React.FC<{ className?: string; style?: any }> = ({
  className = "",
  style,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      className={`bg-gray-200 ${className}`}
      style={[style, { opacity: pulseAnim }]}
    />
  );
};

const SkeletonCircle: React.FC<{ size: number; className?: string }> = ({
  size,
  className = "",
}) => (
  <SkeletonBlock
    className={`rounded-full ${className}`}
    style={{ width: size, height: size }}
  />
);

const SkeletonLine: React.FC<{
  width: number | string;
  height?: number;
  className?: string;
}> = ({ width, height = 16, className = "" }) => (
  <SkeletonBlock className={`rounded ${className}`} style={{ width, height }} />
);

export const ProfileSkeleton: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* En-tête avec photo de fond et avatar */}
        <View className="relative items-center mt-4">
          <SkeletonBlock className="w-full h-64 rounded-b-3xl" />
          <View className="absolute inset-0 items-center justify-center">
            <SkeletonCircle size={128} className="border-4 border-white" />
            <SkeletonLine width={150} height={24} className="mt-4" />
            <SkeletonLine width={100} height={16} className="mt-2" />
          </View>
        </View>

        {/* Carte Informations de contact */}
        <View className="mx-5 mt-8 bg-white rounded-xl p-5 shadow-sm">
          <SkeletonLine width={180} height={22} className="mb-4" />
          {[1, 2, 3, 4].map((i) => (
            <View key={i} className="flex-row items-center mb-4">
              <SkeletonCircle size={40} />
              <View className="ml-3 flex-1">
                <SkeletonLine width={80} height={12} className="mb-1" />
                <SkeletonLine width={150} height={16} />
              </View>
            </View>
          ))}
        </View>

        {/* Carte Type d'acteur */}
        <View className="mx-5 mt-6 bg-white rounded-xl p-5 shadow-sm">
          <SkeletonLine width={140} height={22} className="mb-4" />
          <View className="flex-row items-center">
            <SkeletonCircle size={48} />
            <View className="ml-4 flex-1">
              <SkeletonLine width={120} height={18} className="mb-2" />
              <SkeletonLine width="100%" height={14} className="mb-2" />
              <SkeletonLine width={60} height={24} className="rounded-full" />
            </View>
          </View>
        </View>

        {/* Bouton de déconnexion simulé */}
        <View className="mx-5 my-8">
          <SkeletonBlock className="bg-gray-200 py-4 rounded-xl" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
