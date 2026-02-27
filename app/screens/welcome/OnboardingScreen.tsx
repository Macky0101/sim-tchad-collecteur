// ─────────────────────────────────────────────────────────────────────
// OnboardingScreen.tsx — React Native + NativeWind (className)
// Swipeable onboarding with 3 steps, dots indicator, Skip/Next
// ─────────────────────────────────────────────────────────────────────
//
// Usage:
//   import { OnboardingScreen } from "@/components/screens/OnboardingScreen";
//   <OnboardingScreen onFinish={() => router.push("/login")} />
// ─────────────────────────────────────────────────────────────────────

import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

function ArrowRightIcon({ color = "#fff" }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h14M12 5l7 7-7 7"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface OnboardingSlide {
  id: string;
  image: any;
  title: string;
  subtitle: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: "1",
    image: require("../../../assets/images/icon.png"),
    title: "Collecte des prix",
    subtitle:
      "Saisissez rapidement les prix des produits agricoles sur les differents marches du Tchad.",
  },
  {
    id: "2",
    image: require("../../../assets/images/icon.png"),
    title: "Suivi en temps reel",
    subtitle:
      "Les donnees collectees alimentent le systeme national de suivi des prix pour une meilleure prise de decision.",
  },
  {
    id: "3",
    image: require("../../../assets/images/icon.png"),
    title: "Fonctionne hors ligne",
    subtitle:
      "Collectez les prix meme sans connexion Internet. Les donnees se synchronisent automatiquement.",
  },
];

interface OnboardingScreenProps {
  onFinish: () => void;
  slides?: OnboardingSlide[];
}

export function OnboardingScreen({
  onFinish,
  slides = SLIDES,
}: OnboardingScreenProps) {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const goNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      onFinish();
    }
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={{ width }} className="flex-1 items-center bg-white px-6">
      {/* Illustration */}
      <View
        className="mt-20 items-center justify-center"
        style={{ height: width * 0.7 }}
      >
        <Image
          source={item.image}
          style={{ width: width * 0.75, height: width * 0.65 }}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text className="mt-8 text-center text-2xl font-bold text-[#1a1a2e]">
        {item.title}
      </Text>

      {/* Subtitle */}
      <Text className="mt-4 text-center text-base leading-6 text-[#666]">
        {item.subtitle}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      {/* Bottom controls */}
      <View className="px-6 pb-12">
        {/* Dot indicators */}
        <View className="mb-8 flex-row items-center justify-center gap-2">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`rounded-full ${
                index === activeIndex
                  ? "h-2.5 w-8 bg-[#0f7b5f]"
                  : "h-2.5 w-2.5 bg-[#d0d0d0]"
              }`}
            />
          ))}
        </View>

        {/* Skip / Next row */}
        <View className="flex-row items-center justify-between mb-15">
          <Pressable onPress={onFinish} className="px-2 py-2">
            <Text className="text-base text-[#999]">Passer</Text>
          </Pressable>

          <Pressable
            onPress={goNext}
            className="flex-row items-center rounded-full bg-[#0f7b5f] px-8 py-4 active:opacity-80"
          >
            <Text className="mr-2 text-base font-bold text-white">
              {activeIndex === slides.length - 1 ? "Commencer" : "Suivant"}
            </Text>
            <ArrowRightIcon color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
