import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useData } from "@/contexts/Data/useData";
import { useTabBarHeight } from "@/hooks/use-tab-bar-height";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const tabBarHeight = useTabBarHeight();

  const {
    sectors,
    categories,
    speculations,
    stores,
    settings,
    productionAreas,
    unitsOfMeasure,
    productTypes,
    products,
    currencies,
    typeActors,
    loading,
    error,
    getAllSectors,
    getAllCategories,
    getAllSpeculations,
    getAllStores,
    getAllSettings,
    getAllProductionAreas,
    getAllUnitsOfMeasure,
    getAllProductTypes,
    getAllProducts,
    getAllCurrencies,
    getAllTypeActors,
  } = useData();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight }}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Test des APIs</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Vérification des Services</ThemedText>
          <ThemedText>
            Cliquez sur les boutons pour tester la récupération des données.
          </ThemedText>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllSectors()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Secteurs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllCategories()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Catégories</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllSpeculations()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Spéculations</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllStores()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Magasins</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllSettings()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Paramètres</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllProductionAreas()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Zones de production</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllUnitsOfMeasure()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Unités de mesure</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllProductTypes()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Types de produits</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllProducts()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Produits</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllCurrencies()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Devises</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getAllTypeActors()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>type actor</Text>
            </TouchableOpacity>
          </View>

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Erreur: {error}</Text>
            </View>
          )}

          {/* Secteurs */}
          {sectors && sectors.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">Secteurs ({sectors.length})</Text>
              {sectors.slice(0, 3).map((s, i) => (
                <Text className="text-black" key={i}>
                  - {s.name} ({s.code})
                </Text>
              ))}
            </View>
          )}

          {/* Catégories */}
          {categories && categories.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">
                Catégories ({categories.length})
              </Text>
              {categories.slice(0, 3).map((c, i) => (
                <Text className="text-black" key={i}>
                  - {c.name} ({c.code})
                </Text>
              ))}
            </View>
          )}

          {/* Spéculations */}
          {speculations && speculations.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">
                Spéculations ({speculations.length})
              </Text>
              {speculations.slice(0, 3).map((sp, i) => (
                <Text className="text-black" key={i}>
                  - {sp.name} ({sp.code})
                </Text>
              ))}
            </View>
          )}
          {/* Magasins */}
          {stores && stores.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">Magasins ({stores.length})</Text>
              {stores.slice(0, 3).map((s, i) => (
                <Text className="text-black" key={i}>
                  - {s.name} ({s.code})
                </Text>
              ))}
            </View>
          )}
          {/* Settings */}
          {settings && settings.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">Settings ({settings.length})</Text>
              {settings.slice(0, 3).map((s, i) => (
                <Text className="text-black" key={i}>
                  - {s.organization_name} ({s.system_acronym})
                </Text>
              ))}
            </View>
          )}
          {/* Production Areas */}
          {productionAreas && productionAreas.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">
                Zones de production ({productionAreas.length})
              </Text>
              {productionAreas.slice(0, 3).map((pa, i) => (
                <Text className="text-black" key={i}>
                  - {pa.name} ({pa.code})
                </Text>
              ))}
            </View>
          )}
          {/* Units of Measure */}
          {unitsOfMeasure && unitsOfMeasure.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">
                Unités de mesure ({unitsOfMeasure.length})
              </Text>
              {unitsOfMeasure.slice(0, 3).map((uom, i) => (
                <Text className="text-black" key={i}>
                  - {uom.name} ({uom.code})
                </Text>
              ))}
            </View>
          )}
          {/* Product Types */}
          {productTypes && productTypes.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">
                Types de produits ({productTypes.length})
              </Text>
              {productTypes.slice(0, 3).map((pt, i) => (
                <Text className="text-black" key={i}>
                  - {pt.name} ({pt.code})
                </Text>
              ))}
            </View>
          )}
          {/* Products */}
          {products && products.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">Produits ({products.length})</Text>
              {products.slice(0, 3).map((p, i) => (
                <Text className="text-black" key={i}>
                  - {p.name} ({p.code})
                </Text>
              ))}
            </View>
          )}
          {/* Currencies */}
          {currencies && currencies.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">Devises ({currencies.length})</Text>
              {currencies.slice(0, 3).map((c, i) => (
                <Text className="text-black" key={i}>
                  - {c.name} ({c.code})
                </Text>
              ))}
            </View>
          )}
          {/* Type Actors */}
          {typeActors && typeActors.length > 0 && (
            <View className="bg-white p-4 rounded-lg mt-4">
              <Text className="text-black">
                Types d'acteurs ({typeActors.length})
              </Text>
              {typeActors.slice(0, 3).map((ta, i) => (
                <Text className="text-black" key={i}>
                  - {ta.name} ({ta.code})
                </Text>
              ))}
            </View>
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    gap: 5,
  },
  button: {
    backgroundColor: "#A1CEDC",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  errorContainer: {
    backgroundColor: "#ffcccc",
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    color: "#cc0000",
  },
  resultContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  resultTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 12,
  },
});
