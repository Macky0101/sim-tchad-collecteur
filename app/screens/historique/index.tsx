import { deleteProduct } from "@/app/database/services/product/deleteProduct";
import { getProducts } from "@/app/database/services/product/getProducts";
import { getProductTypes } from "@/app/database/services/ProductType/getProductTypes";
import { ProductTypeListHorizontal } from "@/components/common/ProductType";
import { SearchBar } from "@/components/common/SearchBar";
import { UserMasonryProductList } from "@/components/common/UserMasonryProductList";
import { useAuth } from "@/contexts/auth";
import { Product } from "@/types/product";
import { ProductType } from "@/types/productTypes";
import shuffleArray from "@/utils/array";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProductsScreen() {
  const { user } = useAuth();
  const [selectedServerTypeId, setSelectedServerTypeId] = useState<
    string | null
  >(null);
  const actorId = user?.id;
  // console.log("actorId", actorId);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [products, types] = await Promise.all([
        getProducts(),
        getProductTypes(),
      ]);

      setUserProducts(shuffleArray(products));
      setProductTypes(types);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setUserProducts([]);
      setProductTypes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  // Filtrage local (recherche et type)
  const filteredProducts = useMemo(() => {
    let result = userProducts;

    // ✅ Filtre avec product_type_id === serverId du type sélectionné
    if (selectedServerTypeId && selectedServerTypeId !== "0") {
      result = result.filter((p) => p.product_type_id === selectedServerTypeId);
      console.log(
        "🔍 Filtrage par serverId:",
        selectedServerTypeId,
        "Produits trouvés:",
        result.length,
      );
    }

    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(lowerQuery));
    }
    return result;
  }, [userProducts, searchQuery, selectedServerTypeId]);

  // Suppression d'un produit
  const handleDelete = async (product: Product) => {
    Alert.alert("Confirmer suppression", `Supprimer "${product.name}" ?`, [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteProduct(product.id);
            await loadData(); // Recharge la liste après suppression
            Alert.alert("Succès", "Produit supprimé");
          } catch (error) {
            Alert.alert("Erreur", "Impossible de supprimer le produit");
          }
        },
      },
    ]);
  };

  // Édition d'un produit (navigation)
  const handleEdit = (product: Product) => {
    router.push({
      pathname: "/screens/products/edit/[id]",
      params: { id: product.id },
    });
  };

  // Affichage du chargement initial
  if (loading && !refreshing) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text>Chargement de vos produits...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pb-2 pt-4">
        <Text className="text-2xl font-bold">Mes produits collectés</Text>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Rechercher dans mes produits..."
        onClear={() => setSearchQuery("")}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0f7b5f"]}
            tintColor="#0f7b5f"
          />
        }
      >
        <ProductTypeListHorizontal
          productTypes={productTypes}
          selectedTypeId={selectedServerTypeId}
          onProductTypeSelect={(productType) => {
            const serverIdToUse =
              productType.serverId === "0" ? "0" : productType.serverId;
            setSelectedServerTypeId(serverIdToUse);
            console.log("✅ Type sélectionné - serverId:", serverIdToUse);
          }}
        />

        {/* Contenu principal */}
        {filteredProducts.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500">
              {searchQuery || selectedTypeId
                ? "Aucun produit trouvé"
                : "Aucun produit collecté"}
            </Text>
          </View>
        ) : (
          <UserMasonryProductList
            products={filteredProducts}
            onProductPress={(product) =>
              router.push({
                pathname: "/screens/products/[id]",
                params: { id: product.id },
              })
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
            onEndReached={() => {}}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
