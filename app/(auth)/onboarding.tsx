import { OnboardingScreen } from "@/app/screens/welcome/OnboardingScreen";
import { STORAGE_KEYS } from "@/constants/storage";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function OnboardingPage() {
  const router = useRouter();

  const handleFinish = async () => {
    // Marquer l'onboarding comme terminé
    await SecureStore.setItemAsync(STORAGE_KEYS.onboardingCompleted, "true");
    // Naviguer vers le login
    router.replace("/(auth)/login");
  };

  return <OnboardingScreen onFinish={handleFinish} />;
}
