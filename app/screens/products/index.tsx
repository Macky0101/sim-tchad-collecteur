import { MasonryProductList } from "@/components/common/ProductCard";
import { ProductTypeListHorizontal } from "@/components/common/ProductType";
import { SearchBar } from "@/components/common/SearchBar";
import { StoreListHorizontal } from "@/components/common/StoreList";
import { useData } from "@/contexts/Data/useData";
import { Product } from "@/types/product";
import shuffleArray from "@/utils/array";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductScreen() {
  const {
    speculations,
    products,
    stores,
    productTypes,
    getAllSpeculations,
    getAllProducts,
    getAllStores,
    getAllProductTypes,
  } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      setShuffledProducts(shuffleArray(products));
    }
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = shuffledProducts;

    // Filtre par type si sélectionné
    if (selectedTypeId !== null) {
      result = result.filter(
        (product) => product.product_type_id === selectedTypeId,
      );
    }

    // Filtre par recherche
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(lowerQuery),
      );
    }

    return result;
  }, [shuffledProducts, searchQuery, selectedTypeId]);

  useEffect(() => {
    getAllSpeculations();
    getAllProducts();
    getAllStores();
    getAllProductTypes();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        getAllSpeculations?.(),
        getAllProducts?.(),
        getAllStores?.(),
        getAllProductTypes?.(),
      ]);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement", error);
    } finally {
      setRefreshing(false);
    }
  }, [getAllSpeculations, getAllProducts, getAllStores, getAllProductTypes]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Rechercher un produit..."
        onSubmit={() => console.log("Recherche lancée :", searchQuery)}
        onClear={() => setSearchQuery("")}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0f7b5f"]} // android
            tintColor="#0f7b5f" // ios
          />
        }
      >
        <StoreListHorizontal
          stores={stores?.length ? stores : []}
          onSeeAllPress={() => {
            router.push("/(tabs)/store");
          }}
          onStorePress={(store) => {
            router.push({
              pathname: "/screens/stores/[id]",
              params: { id: store.id, name: store.name },
            });
          }}
        />

        <ProductTypeListHorizontal
          productTypes={productTypes}
          selectedTypeId={selectedTypeId}
          onProductTypeSelect={(productType) => {
            setSelectedTypeId(productType.id === 0 ? null : productType.id);
          }}
        />
        <MasonryProductList
          products={filteredProducts}
          onProductPress={(product) =>
            router.push({
              pathname: "/screens/products/[id]",
              params: {
                id: product.id,
                photo: product.photo,
                name: product.name,
                price: product.price,
                description: product.description,
                quantity: product.quantity,
                measure_used: product.measure_used,
                origin: product.origin,
              },
            })
          }
          onEndReached={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
