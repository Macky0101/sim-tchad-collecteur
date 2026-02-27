import { Product } from "@/types/product";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { ProductCard } from "./ProductCard";

interface UserProductCardProps {
  product: Product;
  columnWidth?: number;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const UserProductCard = ({
  product,
  columnWidth,
  onEdit,
  onDelete,
}: UserProductCardProps) => {
  const handleOptionsPress = () => {
    Alert.alert(
      "Options",
      "Que voulez-vous faire ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Modifier", onPress: () => onEdit?.(product) },
        {
          text: "Supprimer",
          onPress: () => {
            Alert.alert(
              "Confirmation",
              "Êtes-vous sûr de vouloir supprimer ce produit ?",
              [
                { text: "Annuler", style: "cancel" },
                {
                  text: "Supprimer",
                  style: "destructive",
                  onPress: () => onDelete?.(product),
                },
              ],
            );
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View className="relative">
      <ProductCard product={product} columnWidth={columnWidth} />
      {/* Bouton d'options superposé */}
      <TouchableOpacity
        onPress={handleOptionsPress}
        className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5"
        style={{ zIndex: 10 }}
      >
        <MaterialIcons name="more-vert" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
};
