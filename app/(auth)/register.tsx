import { RegisterScreen } from "@/app/screens/register";
import { useActor } from "@/contexts/actors";
import { useRouter } from "expo-router";

export default function RegisterPage() {
  const router = useRouter();
  const { createActor } = useActor();

  const handleRegister = async (data: any) => {
    try {
      await createActor(data);
      // console.log("Actor created successfully", data);
      router.replace("/(auth)/login");
    } catch (error) {
      console.log("Actor creation failed", error);
    }
  };

  return (
    <RegisterScreen
      onRegister={(data) => handleRegister(data)}
      onSignIn={() => router.push("/login")}
    />
  );
}
