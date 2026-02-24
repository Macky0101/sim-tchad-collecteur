// ─────────────────────────────────────────────────────────────────────
// LoginScreen.tsx — React Native + NativeWind (className)
// Clean login with illustration, phone + password fields, social login
// ─────────────────────────────────────────────────────────────────────
//
// Usage:
//   import { LoginScreen } from "@/components/screens/LoginScreen";
//   <LoginScreen
//     onLogin={(data) => handleLogin(data)}
//     onForgotPassword={() => router.push("/forgot")}
//     onCreateAccount={() => router.push("/register")}
//   />
// ─────────────────────────────────────────────────────────────────────

import { LinearGradient } from "expo-linear-gradient";
import { ChevronDown } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Svg, { Circle, Path, Rect } from "react-native-svg";

import { CustomInput } from "@/components/common/CustomInput";
import { router } from "expo-router";

// ─── Icons ────────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function LockIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={11}
        width={18}
        height={11}
        rx={2}
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function EyeIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke="#bbb"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={12}
        cy={12}
        r={3}
        stroke="#bbb"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function EyeOffIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
        stroke="#bbb"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1 1l22 22"
        stroke="#bbb"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CheckboxIcon({ checked }: { checked: boolean }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={3}
        width={18}
        height={18}
        rx={4}
        stroke={checked ? "#0f7b5f" : "#ccc"}
        strokeWidth={2}
        fill={checked ? "#0f7b5f" : "none"}
      />
      {checked && (
        <Path
          d="M8 12l3 3 5-6"
          stroke="#fff"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
}
// ─── Login Screen ─────────────────────────────────────────────────────

export interface LoginData {
  phone: string;
  password: string;
}

interface LoginScreenProps {
  onLogin: (data: LoginData) => void;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
}

export function LoginScreen({
  onLogin,
  onForgotPassword,
  onCreateAccount,
}: LoginScreenProps) {
  const [phone, setPhone] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [errors, setErrors] = useState<{ phone: string; password: string }>({
    phone: "",
    password: "",
  });
  const phoneInputRef = useRef<PhoneInput>(null);

  const clearError = (field: "phone" | "password") => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleLogin = () => {
    const newErrors = { phone: "", password: "" };
    let hasError = false;

    // Vérifier que le numéro contient plus que juste l'indicatif
    if (!phoneNumber.trim() || !formattedValue.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = "Le mot de passe est requis";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    console.log("📱 Connexion avec:", {
      phone: formattedValue,
      password: "***",
    });
    onLogin({ phone: formattedValue, password });
  };

  const onGetStarted = () => {
    router.push("/(tabs)");
  };
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration */}
        <View className="items-center bg-[#f0faf6] pb-4 pt-16">
          <Image
            source={require("../../../assets/images/icon.png")}
            style={{ width: 220, height: 160 }}
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <View className="flex-1 px-6 pt-6">
          {/* Heading */}
          <Text className="text-center text-[28px] font-bold text-[#1a1a2e]">
            Welcome Back
          </Text>
          <Text className="mt-2 text-center text-sm leading-5 text-[#888]">
            {"Connectez-vous pour acceder a votre compte et gerer vos achats"}
          </Text>

          {/* Champ téléphone avec indicatif pays */}
          <View className="mb-4 mt-8">
            <View className="flex-row items-center mb-2">
              <Text className="text-gray-700 font-medium text-sm">
                Téléphone
                <Text className="text-red-500"> *</Text>
              </Text>
            </View>

            <View
              className={`
                w-full rounded-lg border bg-white overflow-hidden
                ${errors.phone ? "border-red-300" : phoneFocused ? "border-primary" : "border-gray-300"}
              `}
            >
              <PhoneInput
                ref={phoneInputRef}
                defaultCode="TD"
                layout="first"
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  clearError("phone");
                }}
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
                value={phoneNumber}
                autoFocus={false}
                containerStyle={{
                  width: "100%",
                  height: 48,
                  backgroundColor: "transparent",
                  borderWidth: 0,
                }}
                textContainerStyle={{
                  backgroundColor: "white",
                  height: 48,
                  paddingVertical: 0,
                  borderRadius: 0,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}
                textInputStyle={{
                  fontSize: 16,
                  color: "#1F2937",
                  height: 48,
                  paddingVertical: 0,
                }}
                codeTextStyle={{
                  fontSize: 16,
                  color: "#1F2937",
                }}
                countryPickerButtonStyle={{
                  width: 80,
                  height: 48,
                  paddingHorizontal: 8,
                  backgroundColor: "#F8FAFC",
                  borderRightWidth: 1,
                  borderRightColor: "#E2E8F0",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                flagButtonStyle={{
                  width: "100%",
                  height: "100%",
                }}
                textInputProps={{
                  placeholder: "Entrez votre numéro",
                  placeholderTextColor: "#94A3B8",
                  selectionColor: "#0f7b5f",
                  onFocus: () => setPhoneFocused(true),
                  onBlur: () => setPhoneFocused(false),
                }}
                disableArrowIcon={false}
                renderDropdownImage={<ChevronDown size={16} color="#64748B" />}
              />
            </View>

            {errors.phone ? (
              <Text className="text-red-500 text-xs mt-1">{errors.phone}</Text>
            ) : null}
          </View>

          {/* Password input */}
          <CustomInput
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(val) => {
              setPassword(val);
              clearError("password");
            }}
            type="password"
            iconLeft={<LockIcon />}
            required
            error={errors.password}
            containerClassName="mt-1"
            inputClassName="rounded-xl bg-[#fafafa] py-3.5"
          />

          {/* Remember Me / Forgot Password */}
          <View className="mt-4 flex-row items-center justify-between">
            <Pressable
              onPress={() => setRememberMe(!rememberMe)}
              className="flex-row items-center gap-2"
            >
              <CheckboxIcon checked={rememberMe} />
              <Text className="text-sm text-[#555]">Se souvenir</Text>
            </Pressable>
            <Pressable onPress={onForgotPassword}>
              <Text className="text-sm font-semibold text-[#e74c3c]">
                Mot de passe oublie?
              </Text>
            </Pressable>
          </View>

          {/* Terms */}
          <Text className="mt-5 text-center text-xs leading-4 text-[#999]">
            {'En cliquant "Connexion", vous acceptez nos '}
            <Text className="font-semibold text-[#0f7b5f]">
              Conditions d{"'"}utilisation
            </Text>
            {" et "}
            <Text className="font-semibold text-[#0f7b5f]">
              Politique de confidentialite
            </Text>
          </Text>

          {/* Sign In button */}
          <Pressable
            onPress={handleLogin}
            className="mt-5 overflow-hidden rounded-xl active:opacity-80"
          >
            <LinearGradient
              colors={["#0f7b5f", "#0a5c45"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 16,
                alignItems: "center",
                borderRadius: 12,
              }}
            >
              <Text className="text-base font-bold text-white">
                Se Connecter
              </Text>
            </LinearGradient>
          </Pressable>

          {/* Divider */}
          <View className="my-5 flex-row items-center gap-3">
            <View className="flex-1 border-b border-[#e5e5e5]" />
            <Text className="text-xs text-[#bbb]">Ou</Text>
            <View className="flex-1 border-b border-[#e5e5e5]" />
          </View>

          {/* Create account link */}
          <Pressable
            onPress={onCreateAccount}
            className="mb-8 flex-row items-center justify-center gap-1"
          >
            <Text className="text-sm text-[#888]">
              {"Pas encore de compte?"}
            </Text>
            <Text className="text-sm font-bold text-[#1a1a1a] underline">
              Creer un compte
            </Text>
          </Pressable>
          <Pressable
            onPress={onGetStarted}
            className="mb-8 flex-row items-center justify-center gap-1"
          >
            <Text className="text-sm text-[#888]">
              {"Explorer sans compte"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
