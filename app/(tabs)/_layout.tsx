import { BottomTabBar } from "@/components/BottomTabBar";
import { Tabs, useRouter } from "expo-router";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      tabBar={(props) => (
        <BottomTabBar
          {...props}
          onAddPress={() => {
            router.push("/screens/form/product");
          }}
        />
      )}
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Accueil" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}
