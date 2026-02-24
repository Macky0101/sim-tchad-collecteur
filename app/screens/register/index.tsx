// RegisterScreen.tsx

import { CustomInput } from "@/components/common/CustomInput";
import { ImagePickerSection } from "@/components/common/ImagePickerSection";
import { useData } from "@/contexts/Data/useData";
import { CreateActorRequest } from "@/types/actors";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { ChevronDown } from "lucide-react-native"; // Pour l'icône du dropdown
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
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

// ─── Icons ────────────────────────────────────────────────────────────

function UserIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke="#999" strokeWidth={1.8} />
      <Path
        d="M5 20c0-4 3.5-7 7-7s7 3 7 7"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function MailIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect
        x={2}
        y={4}
        width={20}
        height={16}
        rx={2}
        stroke="#999"
        strokeWidth={1.8}
      />
      <Path
        d="M2 7l10 6 10-6"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

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

function WhatsAppIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        stroke="#999"
        strokeWidth={1.8}
      />
      <Path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TagIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={7} cy={7} r={1.5} fill="#999" />
    </Svg>
  );
}

function GridIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={3}
        width={7}
        height={7}
        rx={1}
        stroke="#999"
        strokeWidth={1.8}
      />
      <Rect
        x={14}
        y={3}
        width={7}
        height={7}
        rx={1}
        stroke="#999"
        strokeWidth={1.8}
      />
      <Rect
        x={3}
        y={14}
        width={7}
        height={7}
        rx={1}
        stroke="#999"
        strokeWidth={1.8}
      />
      <Rect
        x={14}
        y={14}
        width={7}
        height={7}
        rx={1}
        stroke="#999"
        strokeWidth={1.8}
      />
    </Svg>
  );
}

function MapPinIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={10} r={3} stroke="#999" strokeWidth={1.8} />
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
      />
      <Path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function HashIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 9h16M4 15h16M10 3l-2 18M16 3l-2 18"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function FileTextIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 2v6h6M8 13h8M8 17h8M8 9h2"
        stroke="#999"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ChevronLeftIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke="#1a1a2e"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface RegisterScreenProps {
  onRegister: (data: CreateActorRequest) => void;
  onSignIn?: () => void;
}

// Type local pour le formulaire (avec confirmPassword)
interface FormData extends CreateActorRequest {
  confirmPassword?: string;
}

export function RegisterScreen({ onRegister, onSignIn }: RegisterScreenProps) {
  const [step, setStep] = useState(1);
  const { typeActors, getAllTypeActors } = useData();

  // États pour le téléphone
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [phoneFocused, setPhoneFocused] = useState(false);
  const phoneInputRef = useRef<PhoneInput>(null);

  // États pour la localisation
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null,
  );

  // État du formulaire (adapté aux noms API)
  const [form, setForm] = useState<FormData>({
    actor: "",
    actor_sigle: "",
    email: "",
    phone: "",
    whatsapp: "",
    actor_type_id: 1, // sera mis à jour après chargement
    is_active: true,
    headquarter_photo: "",
    logo: "",
    address: "",
    latitude: 0,
    longitude: 0,
    password: "",
    confirmPassword: "",
    updated_by: "", // optionnel, peut être renseigné automatiquement côté backend
    code: "",
    description: "",
  });

  // État des erreurs
  const [errors, setErrors] = useState({
    actor: "",
    actor_sigle: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  // Charger les types d'acteurs
  useEffect(() => {
    getAllTypeActors();
  }, []);

  // Sélectionner le premier type par défaut
  useEffect(() => {
    if (typeActors && typeActors.length > 0) {
      setForm((prev) => ({ ...prev, actor_type_id: typeActors[0].id }));
    }
  }, [typeActors]);

  // Synchroniser le numéro de téléphone avec le form
  useEffect(() => {
    if (phoneNumber) {
      // On peut stocker le numéro complet formaté ou le numéro saisi
      // Ici on stocke le numéro complet avec indicatif via getNumberAfterPossiblyEliminatingZero()
      const checkNumber =
        phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero();
      const fullNumber = checkNumber?.number || phoneNumber;
      setForm((prev) => ({ ...prev, phone: fullNumber }));
    } else {
      setForm((prev) => ({ ...prev, phone: "" }));
    }
  }, [phoneNumber]);

  // Fonction pour obtenir la localisation
  const getLocation = async () => {
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");

      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Impossible d'obtenir votre position. Les coordonnées seront mises à 0.",
        );
        setForm((prev) => ({ ...prev, latitude: 0, longitude: 0 }));
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setForm((prev) => ({
        ...prev,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    } catch (error) {
      console.error("Erreur de localisation:", error);
      Alert.alert(
        "Erreur",
        "Impossible d'obtenir votre position. Les coordonnées seront mises à 0.",
      );
      setForm((prev) => ({ ...prev, latitude: 0, longitude: 0 }));
    } finally {
      setLocationLoading(false);
    }
  };

  // Appeler la localisation au passage à l'étape 2 ou au montage de l'étape 2
  useEffect(() => {
    if (step === 2 && locationPermission === null) {
      getLocation();
    }
  }, [step]);

  // Mise à jour d'un champ
  const updateField = (
    key: keyof FormData,
    value: string | number | boolean,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Effacer une erreur
  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Validation étape 1
  const validateStep1 = () => {
    const newErrors = { ...errors };
    let hasError = false;

    if (!form.actor.trim()) {
      newErrors.actor = "Le nom est requis";
      hasError = true;
    } else {
      newErrors.actor = "";
    }

    if (!form.actor_sigle.trim()) {
      newErrors.actor_sigle = "Le sigle est requis";
      hasError = true;
    } else {
      newErrors.actor_sigle = "";
    }

    if (!form.email.trim()) {
      newErrors.email = "L'email est requis";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "L'email doit être valide";
      hasError = true;
    } else {
      newErrors.email = "";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
      hasError = true;
    } else {
      newErrors.phone = "";
    }

    // WhatsApp optionnel, pas de validation particulière

    setErrors(newErrors);
    return !hasError;
  };

  // Validation étape 2
  const validateStep2 = () => {
    const newErrors = { ...errors };
    let hasError = false;

    if (!form.address.trim()) {
      newErrors.address = "L'adresse est requise";
      hasError = true;
    } else {
      newErrors.address = "";
    }

    if (!form.code.trim()) {
      newErrors.code = "Le code est requis";
      hasError = true;
    } else {
      newErrors.code = "";
    }

    if (!form.password) {
      newErrors.password = "Le mot de passe est requis";
      hasError = true;
    } else if (form.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
      hasError = true;
    } else {
      newErrors.password = "";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
      hasError = true;
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      hasError = true;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleContinue = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
      return;
    }

    if (validateStep2()) {
      // Préparer les données sans confirmPassword
      const { confirmPassword, ...dataToSend } = form;
      onRegister(dataToSend);
    }
  };

  // Gestion des images
  const pickImage = async (field: "headquarter_photo" | "logo") => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission requise",
          "Permission d'accès à la galerie requise",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        if (result.assets[0].base64) {
          updateField(
            field,
            `data:image/jpeg;base64,${result.assets[0].base64}`,
          );
        } else {
          updateField(field, result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error("Erreur sélection image:", error);
      Alert.alert("Erreur", "Erreur lors de la sélection de l'image");
    }
  };

  const takePhoto = async (field: "headquarter_photo" | "logo") => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission requise",
          "Permission d'accès à la caméra requise",
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        if (result.assets[0].base64) {
          updateField(
            field,
            `data:image/jpeg;base64,${result.assets[0].base64}`,
          );
        } else {
          updateField(field, result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error("Erreur prise photo:", error);
      Alert.alert("Erreur", "Erreur lors de la prise de photo");
    }
  };

  const handleRemoveImage = (field: "headquarter_photo" | "logo") => {
    updateField(field, "");
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
        {/* Header avec illustration */}
        <View className="items-center bg-[#f0faf6] pb-2 pt-14">
          {step === 2 && (
            <Pressable
              onPress={() => setStep(1)}
              className="absolute left-4 top-14 z-10 rounded-full bg-white/80 p-2"
            >
              <ChevronLeftIcon />
            </Pressable>
          )}
          <Image
            source={require("../../../assets/images/icon.png")}
            style={{ width: 200, height: 140 }}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 px-6 pt-5">
          <Text className="text-center text-[28px] font-bold text-[#1a1a2e]">
            Créer un Compte
          </Text>
          <Text className="mt-2 text-center text-sm text-[#888]">
            {step === 1
              ? "Remplissez vos informations pour commencer"
              : "Complétez votre profil pour finaliser"}
          </Text>

          {/* Indicateur d'étape */}
          <View className="mt-4 mb-5 flex-row items-center justify-center gap-2">
            <View
              className={`h-1.5 w-12 rounded-full ${step >= 1 ? "bg-[#0f7b5f]" : "bg-[#e0e0e0]"}`}
            />
            <View
              className={`h-1.5 w-12 rounded-full ${step >= 2 ? "bg-[#0f7b5f]" : "bg-[#e0e0e0]"}`}
            />
          </View>

          {step === 1 ? (
            /* ÉTAPE 1 : Identité */
            <>
              <CustomInput
                label="Nom complet"
                placeholder="Entrez le nom complet"
                value={form.actor}
                onChange={(val) => {
                  updateField("actor", val);
                  clearError("actor");
                }}
                type="text"
                iconLeft={<UserIcon />}
                required
                error={errors.actor}
                containerClassName="mt-1"
                inputClassName="rounded-xl bg-[#fafafa] py-3.5"
              />

              <CustomInput
                label="Sigle"
                placeholder="Entrez le sigle"
                value={form.actor_sigle}
                onChange={(val) => {
                  updateField("actor_sigle", val);
                  clearError("actor_sigle");
                }}
                type="text"
                iconLeft={<TagIcon />}
                required
                error={errors.actor_sigle}
                containerClassName="mt-1"
                inputClassName="rounded-xl bg-[#fafafa] py-3.5"
              />

              <CustomInput
                label="Email"
                placeholder="Entrez votre email"
                value={form.email}
                onChange={(val) => {
                  updateField("email", val);
                  clearError("email");
                }}
                type="text"
                iconLeft={<MailIcon />}
                required
                error={errors.email}
                containerClassName="mt-1"
                inputClassName="rounded-xl bg-[#fafafa] py-3.5"
              />

              {/* Champ téléphone avec indicatif pays */}
              <View className="mb-4 mt-2">
                <View className="flex-row items-center mb-2">
                  <Text className="text-gray-700 font-medium text-sm">
                    Téléphone
                    <Text className="text-red-500"> *</Text>
                  </Text>
                </View>

                <View
                  className={`
                    w-full rounded-lg border bg-white overflow-hidden
                    ${errors.phone ? "border-red-300" : phoneFocused ? "border-[#0f7b5f]" : "border-gray-300"}
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
                    renderDropdownImage={
                      <ChevronDown size={16} color="#64748B" />
                    }
                  />
                </View>

                {errors.phone ? (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.phone}
                  </Text>
                ) : null}
              </View>

              <CustomInput
                label="WhatsApp (optionnel)"
                placeholder="Entrez votre WhatsApp"
                value={form.whatsapp}
                onChange={(val) => {
                  updateField("whatsapp", val);
                  clearError("whatsapp");
                }}
                type="text"
                iconLeft={<WhatsAppIcon />}
                error={errors.whatsapp}
                containerClassName="mt-1"
                inputClassName="rounded-xl bg-[#fafafa] py-3.5"
              />

              {/* Sélecteur de type d'acteur */}
              <View className="mb-3">
                <View className="flex-row items-center gap-2 mb-2 ml-1">
                  <GridIcon />
                  <Text className="text-sm text-[#888]">Type d'acteur</Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {typeActors?.map((type) => (
                    <Pressable
                      key={type.id}
                      onPress={() => updateField("actor_type_id", type.id)}
                      className={`rounded-full border px-4 py-2.5 ${
                        form.actor_type_id === type.id
                          ? "border-[#0f7b5f] bg-[#0f7b5f]"
                          : "border-[#e0e0e0] bg-white"
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          form.actor_type_id === type.id
                            ? "text-white"
                            : "text-[#555]"
                        }`}
                      >
                        {type.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </>
          ) : (
            /* ÉTAPE 2 : Détails + Photos + Localisation */
            <>
              <CustomInput
                label="Adresse"
                placeholder="Entrez votre adresse"
                value={form.address}
                onChange={(val) => {
                  updateField("address", val);
                  clearError("address");
                }}
                type="text"
                iconLeft={<MapPinIcon />}
                required
                error={errors.address}
                containerClassName="mt-1"
                inputClassName="rounded-xl bg-[#fafafa] py-3.5"
              />

              {/* Affichage des coordonnées (lecture seule) */}
              <View className="flex-row gap-2 mt-1">
                <View className="flex-1">
                  <Text className="text-gray-600 text-xs">Latitude</Text>
                  <View className="bg-gray-100 rounded-lg p-3 mt-1">
                    <Text className="text-gray-800">
                      {form.latitude !== 0
                        ? form.latitude.toFixed(6)
                        : "Non définie"}
                    </Text>
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-600 text-xs">Longitude</Text>
                  <View className="bg-gray-100 rounded-lg p-3 mt-1">
                    <Text className="text-gray-800">
                      {form.longitude !== 0
                        ? form.longitude.toFixed(6)
                        : "Non définie"}
                    </Text>
                  </View>
                </View>
              </View>
              {locationLoading && (
                <Text className="text-xs text-primary mt-1">
                  Obtention de la position...
                </Text>
              )}

              <CustomInput
                label="Code"
                placeholder="Entrez votre code"
                value={form.code}
                onChange={(val) => {
                  updateField("code", val);
                  clearError("code");
                }}
                type="text"
                iconLeft={<HashIcon />}
                required
                error={errors.code}
                containerClassName="mt-1"
                inputClassName="rounded-xl bg-[#fafafa] py-3.5"
              />

              <CustomInput
                label="Mot de passe"
                placeholder="Entrez votre mot de passe"
                value={form.password}
                onChange={(val) => {
                  updateField("password", val);
                  clearError("password");
                }}
                type="password"
                iconLeft={<LockIcon />}
                required
                error={errors.password}
                containerClassName="mt-1"
                inputClassName="rounded-xl bg-[#fafafa] py-3.5"
              />

              <CustomInput
                label="Confirmer le mot de passe"
                placeholder="Confirmez votre mot de passe"
                value={form.confirmPassword}
                onChange={(val) => {
                  updateField("confirmPassword", val);
                  clearError("confirmPassword");
                }}
                type="password"
                iconLeft={<LockIcon />}
                required
                error={errors.confirmPassword}
                containerClassName="mt-1"
                inputClassName="rounded-xl bg-[#fafafa] py-3.5"
              />

              <CustomInput
                label="Description (optionnel)"
                placeholder="Entrez votre description"
                value={form.description}
                onChange={(val) => updateField("description", val)}
                type="text"
                iconLeft={<FileTextIcon />}
                containerClassName="mt-1"
                inputClassName="rounded-xl bg-[#fafafa] py-3.5"
              />

              {/* Champs photos */}
              <ImagePickerSection
                title="Photo du siège"
                imagePreview={form.headquarter_photo}
                onPickImage={() => pickImage("headquarter_photo")}
                onTakePhoto={() => takePhoto("headquarter_photo")}
                onRemoveImage={() => handleRemoveImage("headquarter_photo")}
                containerClassName="mt-4"
              />

              <ImagePickerSection
                title="Logo"
                imagePreview={form.logo}
                onPickImage={() => pickImage("logo")}
                onTakePhoto={() => takePhoto("logo")}
                onRemoveImage={() => handleRemoveImage("logo")}
                containerClassName="mt-4"
              />
            </>
          )}

          {/* Texte des conditions */}
          <Text className="mt-2 text-center text-xs leading-4 text-[#999]">
            {'En cliquant "Continuer", vous acceptez nos '}
            <Text className="font-semibold text-[#0f7b5f]">
              Conditions d'utilisation
            </Text>
            {" et "}
            <Text className="font-semibold text-[#0f7b5f]">
              Politique de confidentialité
            </Text>
          </Text>

          {/* Bouton Continuer / Créer */}
          <Pressable
            onPress={handleContinue}
            className="mt-4 overflow-hidden rounded-xl active:opacity-80"
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
                {step === 1 ? "Continuer" : "Créer le Compte"}
              </Text>
            </LinearGradient>
          </Pressable>

          {/* Lien de connexion */}
          <Pressable
            onPress={onSignIn}
            className="my-6 flex-row items-center justify-center gap-1"
          >
            <Text className="text-sm text-[#888]">Déjà un compte ?</Text>
            <Text className="text-sm font-bold text-[#1a1a1a] underline">
              Se Connecter
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
