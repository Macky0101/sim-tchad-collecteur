import { ProductType } from "@/types/productTypes";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

// Icône chevron droit pour les items du modal
const ChevronRightIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18l6-6-6-6"
      stroke="#0f7b5f"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Icône de liste (hamburger) pour ouvrir le modal
const ListIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 6h16M4 12h16M4 18h16"
      stroke="#0f7b5f"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

// Icône fermeture (X) pour le modal
const CloseIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6l12 12"
      stroke="#888"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface ProductTypeListHorizontalProps {
  productTypes: ProductType[];
  selectedTypeId?: string | null;
  onProductTypeSelect?: (productType: ProductType) => void;
}

export const ProductTypeListHorizontal = ({
  productTypes,
  selectedTypeId,
  onProductTypeSelect,
}: ProductTypeListHorizontalProps) => {
  //  "Tous" avec serverId: "0"
  const allTypes = [
    { id: "0", serverId: "0", name: "Tous" } as ProductType,
    ...productTypes,
  ];
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const renderHorizontalItem = ({ item }: { item: ProductType }) => {
    const itemServerId = item.serverId || item.id;
    const isSelected = itemServerId === selectedTypeId;

    return (
      <TouchableOpacity
        onPress={() => onProductTypeSelect?.(item)}
        className={`mr-2 rounded-lg px-3 py-1.5 ${
          isSelected ? "bg-[#0f7b5f]/10" : "bg-white"
        }`}
      >
        <Text
          className={`text-sm font-medium ${
            isSelected ? "text-[#0f7b5f]" : "text-gray-700"
          }`}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // Rendu d'un item dans la liste modale
  const renderModalItem = ({ item }: { item: ProductType }) => (
    <TouchableOpacity
      onPress={() => {
        closeModal();
        onProductTypeSelect?.(item);
      }}
      className="flex-row items-center justify-between border-b border-gray-100 px-4 py-3"
    >
      <Text className="text-base text-gray-800">{item.name}</Text>
      <ChevronRightIcon />
    </TouchableOpacity>
  );

  return (
    <View className="mb-1">
      {/* En‑tête avec icône pour ouvrir le modal */}
      <View className="flex-row items-center px-4 pb-2">
        {/* Liste horizontale des types (tous, y compris "Tous") */}
        <FlatList
          data={allTypes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `type-${item.id}`}
          renderItem={renderHorizontalItem}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />

        <TouchableOpacity onPress={openModal}>
          <ListIcon />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet (Modal) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Pressable
          className="flex-1 justify-end bg-black/50"
          onPress={closeModal}
        >
          <Pressable
            className="rounded-t-3xl bg-white"
            onPress={(e) => e.stopPropagation()}
          >
            {/* En‑tête du modal */}
            <View className="flex-row items-center justify-between border-b border-gray-100 px-4 py-3">
              <Text className="text-lg font-bold">Types de produits</Text>
              <TouchableOpacity onPress={closeModal}>
                <CloseIcon />
              </TouchableOpacity>
            </View>

            {/* Liste complète des types (y compris "Tous") */}
            <FlatList
              data={allTypes}
              keyExtractor={(item) => `modal-${item.id}`}
              renderItem={renderModalItem}
              contentContainerStyle={{ paddingBottom: 20 }}
              className="max-h-96"
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
