import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <Pressable onPress={() => router.back()} className="mt-4">
        <Text className="text-base text-[#0f7b5f]">← Retour</Text>
      </Pressable>

      <Text className="mt-8 text-2xl font-bold text-[#1a1a2e]">
        Mot de passe oublié
      </Text>
      <Text className="mt-2 text-sm text-[#888]">
        Entrez votre numéro de téléphone pour réinitialiser votre mot de passe.
      </Text>

      <TextInput
        className="mt-6 rounded-xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3.5 text-base text-[#1a1a1a]"
        placeholder="Numéro de téléphone"
        placeholderTextColor="#bbb"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Pressable className="mt-6 rounded-xl bg-[#0f7b5f] py-4 items-center active:opacity-80">
        <Text className="text-base font-bold text-white">Réinitialiser</Text>
      </Pressable>
    </SafeAreaView>
  );
}
