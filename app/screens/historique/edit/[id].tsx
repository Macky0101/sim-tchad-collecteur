import { Stack, useLocalSearchParams } from "expo-router";
import ProductFormWizard from "../../form/product";

export default function EditProductScreen() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Modifier produit",
          headerBackVisible: true,
        }}
      />
      <ProductFormWizard productId={id as string} />
    </>
  );
}
