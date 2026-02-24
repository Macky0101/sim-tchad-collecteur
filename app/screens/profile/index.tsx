import { BASE_URL } from "@/constants/api";
import { useAuth } from "@/contexts/auth";
import { useData } from "@/contexts/Data/useData";
import { useTabBarHeight } from "@/hooks/use-tab-bar-height";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileSkeleton } from "./SkeletonProfile";

// Fonction utilitaire pour obtenir l'URL complète d'une image
const getFullImageUrl = (path: string | null): string | null => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${BASE_URL}/storage/${path}`;
};

// Composant pour l'état non connecté
const UnauthenticatedView = () => {
  const primaryColor = "#0f7b5f";

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-1 items-center justify-center px-6 py-12">
        <View
          className="w-32 h-32 rounded-3xl items-center justify-center mb-8"
          // style={{ backgroundColor: primaryColor + "20" }}
        >
          <AntDesign name="user" size={48} color={primaryColor} />
        </View>

        <Text className="text-3xl font-bold text-gray-800 text-center mb-4 px-8 leading-tight">
          Aucun utilisateur
        </Text>
        <Text className="text-3xl font-bold text-gray-800 text-center mb-2 px-8 leading-tight">
          connecté
        </Text>

        <Text className="text-lg text-gray-500 text-center mb-8 px-12 leading-relaxed">
          Connectez-vous pour accéder à votre profil et gérer vos informations
        </Text>
        <View className="w-full max-w-sm space-y-3">
          <Pressable
            className="py-4 px-6 rounded-2xl items-center"
            style={{ backgroundColor: primaryColor }}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text className="text-white font-semibold text-lg">
              Se connecter
            </Text>
          </Pressable>

          <Pressable
            className="bg-white border-2 py-4 px-6 mt-2 rounded-2xl items-center"
            style={{ borderColor: primaryColor }}
            onPress={() => router.push("/(auth)/register")}
          >
            <Text
              className="font-semibold text-lg"
              style={{ color: primaryColor }}
            >
              Créer un compte
            </Text>
          </Pressable>
        </View>

        {/* Éléments décoratifs */}
        <View
          className="absolute top-20 left-8 w-20 h-20 rounded-full blur-xl"
          style={{ backgroundColor: primaryColor + "20" }}
        />
        <View
          className="absolute bottom-32 right-12 w-24 h-24 rounded-full blur-xl"
          style={{ backgroundColor: primaryColor + "15" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default function ProfilePage() {
  const { signOut, user, isLoading: authLoading } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { typeActors, getAllTypeActors } = useData();
  const tabBarHeight = useTabBarHeight();

  useEffect(() => {
    getAllTypeActors();
  }, []);

  const userActorType = useMemo(() => {
    if (!user?.actor_type_id || !typeActors.length) return null;
    return typeActors.find((type) => type.id === user.actor_type_id);
  }, [user, typeActors]);

  const handleSignOut = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: async () => {
          setIsSigningOut(true);
          try {
            await signOut();
          } catch (error) {
            Alert.alert("Erreur", "Impossible de se déconnecter.");
          } finally {
            setIsSigningOut(false);
          }
        },
      },
    ]);
  };

  // Affichage du squelette pendant le chargement initial de l'auth
  if (authLoading) {
    return <ProfileSkeleton />;
  }

  // Affichage de la vue non connectée
  if (!user) {
    return <UnauthenticatedView />;
  }

  const {
    email,
    phone,
    whatsapp,
    logo,
    headquarter_photo,
    address,
    actor,
    actor_sigle,
  } = user;

  const profileImageUrl = getFullImageUrl(logo);
  const backgroundImageUrl = getFullImageUrl(headquarter_photo);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      >
        {/* Section photo de profil avec image de fond */}
        <View className="relative items-center mt-4">
          <ImageBackground
            source={
              backgroundImageUrl
                ? { uri: backgroundImageUrl }
                : require("../../../assets/images/welcome-bg.jpg")
            }
            className="w-full h-64 rounded-b-3xl overflow-hidden"
            resizeMode="cover"
          >
            <View className="absolute inset-0 bg-black/30" />

            <View className="flex-1 justify-center items-center">
              <View className="relative">
                <Image
                  source={
                    profileImageUrl
                      ? { uri: profileImageUrl }
                      : require("../../../assets/images/default.jpg")
                  }
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <TouchableOpacity
                  className="absolute bottom-0 right-0 p-2 rounded-full border-2 border-white"
                  style={{ backgroundColor: "#0f7b5f" }}
                  onPress={() => Alert.alert("Changer de photo")}
                >
                  <Feather name="camera" size={16} color="white" />
                </TouchableOpacity>
              </View>
              <Text className="mt-4 text-2xl font-bold text-white">
                {actor || "Utilisateur"}
              </Text>
              <Text className="text-sm text-white/80">
                {actor_sigle || "Membre"}
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Bouton paramètres */}
        <View className="flex-row justify-end px-5 mt-2">
          <TouchableOpacity
            onPress={() => Alert.alert("Paramètres", "Fonctionnalité à venir")}
          >
            <Ionicons name="settings-outline" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Informations de contact */}
        <View className="mx-5 mt-8 bg-white rounded-xl p-5 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Informations de contact
          </Text>

          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
              <Ionicons name="mail-outline" size={20} color="#2563EB" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs text-gray-500">Email</Text>
              <Text className="text-base text-gray-800">
                {email || "Non renseigné"}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
              <Ionicons name="call-outline" size={20} color="#16A34A" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs text-gray-500">Téléphone</Text>
              <Text className="text-base text-gray-800">
                {phone || "Non renseigné"}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center">
              <Ionicons name="logo-whatsapp" size={20} color="#059669" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs text-gray-500">WhatsApp</Text>
              <Text className="text-base text-gray-800">
                {whatsapp || phone || "Non renseigné"}
              </Text>
            </View>
          </View>

          {address && (
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center">
                <Ionicons name="location-outline" size={20} color="#EA580C" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-xs text-gray-500">Adresse</Text>
                <Text className="text-base text-gray-800">{address}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Type d'acteur */}
        {userActorType && (
          <View className="mx-5 mt-6 bg-white rounded-xl p-5 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Type d'acteur
            </Text>
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center">
                <Ionicons name="people-outline" size={24} color="#7C3AED" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-base font-bold text-gray-800">
                  {userActorType.name}
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  {userActorType.description}
                </Text>
                <View className="bg-purple-100 self-start px-3 py-1 rounded-full mt-2">
                  <Text className="text-xs font-medium text-purple-700">
                    {userActorType.code}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Bouton de déconnexion */}
        <View className="mx-5 my-8">
          <TouchableOpacity
            onPress={handleSignOut}
            disabled={isSigningOut}
            className="bg-red-500 py-4 rounded-xl flex-row justify-center items-center"
            style={{ opacity: isSigningOut ? 0.5 : 1 }}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="text-white font-semibold text-base ml-2">
              {isSigningOut ? "Déconnexion..." : "Se déconnecter"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
