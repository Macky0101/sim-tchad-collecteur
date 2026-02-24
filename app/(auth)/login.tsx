import { LoginScreen } from "@/app/screens/login";
import { useAuth } from "@/contexts/auth/useAuth";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = async (data: { phone: string; password: string }) => {
    try {
      await signIn(data.phone, data.password);
      // La redirection sera gérée automatiquement par le root layout
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Impossible de se connecter");
    }
  };

  return (
    <LoginScreen
      onLogin={handleLogin}
      onForgotPassword={() => router.push("/(auth)/forgot-password")}
      onCreateAccount={() => router.push("/(auth)/register")}
    />
  );
}
