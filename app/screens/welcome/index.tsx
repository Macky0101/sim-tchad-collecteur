import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

function ArrowRightIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="#0f7b5f"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface WelcomeScreenProps {
  onGetStarted: () => void;
  appName?: string;
  tagline?: string;
}

export function WelcomeScreen({
  onGetStarted,
  appName = "SIM TCHAD",
  tagline = "Connectez-vous à la plateforme SIM TCHAD",
}: WelcomeScreenProps) {
  return (
    <View className="flex-1 bg-[#0a5c45]">
      <StatusBar barStyle="light-content" />

      {/* Background image with overlay */}
      <ImageBackground
        source={require("../../../assets/images/welcome-bg.jpg")}
        style={{ width, height }}
        resizeMode="cover"
      >
        {/* Dark gradient overlay at bottom */}
        <LinearGradient
          colors={["transparent", "rgba(10,92,69,0.6)", "rgba(10,92,69,0.95)"]}
          locations={[0.3, 0.6, 1]}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          {/* Floating decorative cards */}
          <View className="absolute left-8 top-[15%] h-44 w-32 rotate-[-15deg] rounded-2xl bg-white/10 border border-white/20" />
          <View className="absolute right-6 top-[22%] h-52 w-36 rotate-[10deg] rounded-2xl bg-white/15 border border-white/25" />
          <View className="absolute left-16 top-[30%] h-48 w-34 rotate-[-5deg] rounded-2xl bg-white/10 border border-white/15" />

          {/* Bottom content */}
          <View className="px-6 pb-16">
            <Text className="text-3xl font-bold text-white">
              {"Welcome To"}
            </Text>
            <Text className="mt-1 text-3xl font-bold text-white">
              {appName}
            </Text>
            <Text className="mt-3 text-base leading-6 text-white/80">
              {tagline}
            </Text>

            {/* Get Started button */}
            <Pressable
              onPress={onGetStarted}
              className="mt-8 flex-row items-center self-start rounded-full bg-white px-6 py-4 active:opacity-80"
            >
              <Text className="mr-3 text-base font-bold text-[#0a5c45]">
                Commencer
              </Text>
              <ArrowRightIcon />
            </Pressable>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
