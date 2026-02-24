import { WelcomeScreen } from "@/app/screens/welcome";
import { useRouter } from "expo-router";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <WelcomeScreen onGetStarted={() => router.push("/(auth)/onboarding")} />
  );
}
