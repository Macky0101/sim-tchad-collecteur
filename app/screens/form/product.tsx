import { database } from "@/app/database";
import { createProductLocal } from "@/app/database/services/product/createProduct";
import { CustomInput } from "@/components/common/CustomInput";
import { FormSelect } from "@/components/common/CustomSelect";
import { ImagePickerSection } from "@/components/common/ImagePickerSection";
import { useAuth } from "@/contexts/auth"; // pour obtenir l'utilisateur connecté
import { useData } from "@/contexts/Data/useData";
import * as ImagePicker from "expo-image-picker";
import { UserIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types pour les options
interface SelectOption {
  value: string;
  label: string;
}

// Interface pour l'image
interface ImageAsset {
  uri: string;
  fileName?: string;
  type?: string;
}

// État initial du formulaire
const initialForm = {
  name: "",
  code: "",
  description: "",
  product_type_id: "",
  speculation_id: "",
  unit_of_measure_id: "",
  production_area_id: "",
  actor_id: "",
  store_id: "",
  quantity: "",
  price: "",
  origin: "",
  shape: "",
  measure_used: "",
  photo: null as ImageAsset | null,
  production_date: "",
};

type FormDataState = typeof initialForm;

// Définition des étapes
const steps = [
  {
    title: "Informations de base",
    fields: ["name", "code", "description"] as const,
  },
  {
    title: "Catégorisation",
    fields: [
      "product_type_id",
      "speculation_id",
      "unit_of_measure_id",
      "production_area_id",
      "origin",
      "shape",
      "measure_used",
    ] as const,
  },
  {
    title: "Prix et quantité",
    fields: [
      "price",
      "quantity",
      "production_date",
      "actor_id",
      "store_id",
    ] as const,
  },
  {
    title: "Photo",
    fields: ["photo"] as const,
  },
];

export default function ProductFormWizard() {
  const { user } = useAuth();
  const { createProduct } = useData();

  // États pour les options
  const [productTypes, setProductTypes] = useState<SelectOption[]>([]);
  const [speculations, setSpeculations] = useState<SelectOption[]>([]);
  const [unitsOfMeasure, setUnitsOfMeasure] = useState<SelectOption[]>([]);
  const [productionAreas, setProductionAreas] = useState<SelectOption[]>([]);
  const [actors, setActors] = useState<SelectOption[]>([]);
  const [stores, setStores] = useState<SelectOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // État du formulaire
  const [form, setForm] = useState<FormDataState>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataState, string>>
  >({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chargement des options depuis WatermelonDB
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [pt, spec, uom, pa, act, stor] = await Promise.all([
          database.get("product_types").query().fetch(),
          database.get("speculations").query().fetch(),
          database.get("units_of_measure").query().fetch(),
          database.get("production_areas").query().fetch(),
          database.get("actors").query().fetch(),
          database.get("stores").query().fetch(),
        ]);

        setProductTypes(
          pt.map((item: any) => ({
            value: item.serverId, // camelCase (décorateur WatermelonDB)
            label: item.name,
          })),
        );
        setSpeculations(
          spec.map((item: any) => ({
            value: item.serverId,
            label: item.name,
          })),
        );
        setUnitsOfMeasure(
          uom.map((item: any) => ({
            value: item.serverId,
            label: item.name,
          })),
        );
        setProductionAreas(
          pa.map((item: any) => ({
            value: item.serverId,
            label: item.name,
          })),
        );

        setActors(
          act.map((item: any) => ({
            value: item.serverId,
            label: item.actor ?? item.name, // actors utilisent le champ "actor"
          })),
        );
        setStores(
          stor.map((item: any) => ({
            value: item.serverId,
            label: item.name,
          })),
        );

        // Pré-remplir actor_id avec l'ID de l'utilisateur connecté
        if (user?.id) {
          setForm((prev) => ({ ...prev, actor_id: String(user.id) }));
        }
      } catch (error) {
        console.error("Erreur chargement options", error);
      } finally {
        setLoadingOptions(false);
      }
    };
    loadOptions();
  }, [user]);

  // Validation par étape
  const validateStep = (step: number): boolean => {
    const stepFields = steps[step].fields;
    const newErrors: Partial<Record<keyof FormDataState, string>> = {};

    stepFields.forEach((field) => {
      const value = form[field];
      if (field === "photo") return; // la photo est optionnelle
      if (!value || (typeof value === "string" && value.trim() === "")) {
        newErrors[field] = "Ce champ est requis";
      }
      // Validation spécifique pour les nombres
      if (field === "price" || field === "quantity") {
        if (value && isNaN(Number(value))) {
          newErrors[field] = "Doit être un nombre";
        }
      }
      // Validation date (format YYYY-MM-DD)
      if (field === "production_date" && value && typeof value === "string") {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
          newErrors[field] = "Format attendu: YYYY-MM-DD";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Passage à l'étape suivante
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  // Retour à l'étape précédente
  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setErrors({}); // effacer les erreurs en revenant
  };

  // Gestion des changements de champs
  const handleChange = (field: keyof FormDataState, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Effacer l'erreur pour ce champ si elle existe
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Gestion de la photo
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: false,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      handleChange("photo", {
        uri: asset.uri,
        fileName: asset.fileName ?? "photo.jpg",
        type: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission refusée",
        "Nous avons besoin de la caméra pour prendre une photo.",
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      handleChange("photo", {
        uri: asset.uri,
        fileName: asset.fileName ?? "photo.jpg",
        type: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  const handleRemoveImage = () => {
    handleChange("photo", null);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      const newProduct = await createProductLocal({
        name: form.name,
        code: form.code,
        description: form.description,
        product_type_id: Number(form.product_type_id),
        speculation_id: Number(form.speculation_id),
        unit_of_measure_id: Number(form.unit_of_measure_id),
        production_area_id: Number(form.production_area_id),
        actor_id: Number(user?.id),
        store_id: Number(form.store_id),
        quantity: Number(form.quantity),
        price: Number(form.price),
        origin: form.origin,
        shape: form.shape,
        measure_used: form.measure_used,
        photo: form.photo?.uri || null, // URI de l'image ou null
        production_date: form.production_date,
      });

      console.log("✅ Produit créé localement:", newProduct.id);
      // si le produit est creer avec succe renvoyer le au debu du formulaire avec les champ vide
      setForm({
        name: "",
        code: "",
        description: "",
        product_type_id: "",
        speculation_id: "",
        unit_of_measure_id: "",
        production_area_id: "",
        actor_id: "",
        store_id: "",
        quantity: "",
        price: "",
        origin: "",
        shape: "",
        measure_used: "",
        photo: null,
        production_date: "",
      });
      setCurrentStep(0);
      Alert.alert("Succès", "Produit créé avec succès");
    } catch (error: any) {
      console.error("❌ Erreur création:", error);

      // Erreurs spécifiques gérées par createProduct
      let errorMessage = "Erreur création produit";
      if (error.message.includes("code existe déjà")) {
        errorMessage = "Ce code produit existe déjà !";
      }

      Alert.alert("❌ Erreur", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rendu du formulaire pour l'étape courante
  const renderStep = () => {
    if (loadingOptions) {
      return (
        <ActivityIndicator size="large" color="#0f7b5f" className="mt-10" />
      );
    }

    switch (currentStep) {
      case 0:
        return (
          <View>
            <CustomInput
              label="Nom du produit"
              placeholder="Ex: Riz local premium"
              value={form.name}
              onChange={(val) => handleChange("name", val)}
              error={errors.name}
              required
              inputClassName="rounded-xl bg-[#0f7b5f] py-3.5"
              iconLeft={<UserIcon size={20} color="#0f7b5f" />}
            />
            <CustomInput
              label="Code produit"
              placeholder="Ex: RIZ-001"
              value={form.code}
              onChange={(val) => handleChange("code", val)}
              error={errors.code}
              required
              inputClassName="rounded-xl bg-[#0f7b5f] py-3.5"
              iconLeft={<UserIcon size={20} color="#0f7b5f" />}
            />
            <CustomInput
              label="Description"
              placeholder="Description détaillée..."
              value={form.description}
              onChange={(val) => handleChange("description", val)}
              error={errors.description}
              multiline
              required
            />
          </View>
        );
      case 1:
        return (
          <View>
            <FormSelect
              label="Type de produit"
              placeholder="Sélectionner un type"
              value={form.product_type_id}
              onValueChange={(val) => handleChange("product_type_id", val)}
              items={productTypes}
              error={errors.product_type_id}
              required
            />
            <FormSelect
              label="Spéculation"
              placeholder="Sélectionner une spéculation"
              value={form.speculation_id}
              onValueChange={(val) => handleChange("speculation_id", val)}
              items={speculations}
              error={errors.speculation_id}
              required
            />
            <FormSelect
              label="Unité de mesure"
              placeholder="Sélectionner une unité"
              value={form.unit_of_measure_id}
              onValueChange={(val) => handleChange("unit_of_measure_id", val)}
              items={unitsOfMeasure}
              error={errors.unit_of_measure_id}
              required
            />
            <FormSelect
              label="Zone de production"
              placeholder="Sélectionner une zone"
              value={form.production_area_id}
              onValueChange={(val) => handleChange("production_area_id", val)}
              items={productionAreas}
              error={errors.production_area_id}
              required
            />
            <CustomInput
              label="Origine"
              placeholder="Ex: Mayo-Kebbi"
              value={form.origin}
              onChange={(val) => handleChange("origin", val)}
              error={errors.origin}
              required
            />
            <CustomInput
              label="Forme / Conditionnement"
              placeholder="Ex: Grain long"
              value={form.shape}
              onChange={(val) => handleChange("shape", val)}
              error={errors.shape}
              required
            />
            <CustomInput
              label="Mesure utilisée"
              placeholder="Ex: Sac de 50 kg"
              value={form.measure_used}
              onChange={(val) => handleChange("measure_used", val)}
              error={errors.measure_used}
              required
            />
          </View>
        );
      case 2:
        return (
          <View>
            <CustomInput
              label="Prix (FCFA)"
              placeholder="Ex: 1200"
              value={form.price}
              onChange={(val) => handleChange("price", val)}
              error={errors.price}
              keyboardType="numeric"
              required
            />
            <CustomInput
              label="Quantité"
              placeholder="Ex: 100"
              value={form.quantity}
              onChange={(val) => handleChange("quantity", val)}
              error={errors.quantity}
              keyboardType="numeric"
              required
            />
            <CustomInput
              label="Date de production"
              placeholder="YYYY-MM-DD"
              value={form.production_date}
              onChange={(val) => handleChange("production_date", val)}
              error={errors.production_date}
              helperText="Format: 2025-12-10"
              required
            />
            <FormSelect
              label="Magasin de vente"
              placeholder="Sélectionner un magasin"
              value={form.store_id}
              onValueChange={(val) => handleChange("store_id", val)}
              items={stores}
              error={errors.store_id}
              required
            />
          </View>
        );
      case 3:
        return (
          <ImagePickerSection
            title="Photo du produit"
            description="PNG, JPG max 5MB"
            imagePreview={form.photo?.uri || ""}
            onPickImage={handlePickImage}
            onTakePhoto={handleTakePhoto}
            onRemoveImage={handleRemoveImage}
            aspectRatio={[4, 3]}
          />
        );
      default:
        return null;
    }
  };

  // Indicateur d'étapes
  const StepIndicator = () => (
    <View className="flex-row justify-center items-center mb-6">
      {steps.map((_, index) => (
        <View key={index} className="flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              index === currentStep
                ? "bg-primary"
                : index < currentStep
                  ? "bg-primary/30"
                  : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-sm font-bold ${
                index === currentStep ? "text-black" : "text-gray-600"
              }`}
            >
              {index + 1}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View
              className={`w-6 h-0.5 mx-1 ${
                index < currentStep ? "bg-primary" : "bg-gray-200"
              }`}
            />
          )}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <StepIndicator />
        <Text className="text-xl font-bold text-gray-800 mb-4">
          {steps[currentStep].title}
        </Text>

        {renderStep()}

        <View className="flex-row justify-between mt-8">
          <TouchableOpacity
            onPress={goToPrevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl ${
              currentStep === 0 ? "bg-gray-200" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-semibold ${
                currentStep === 0 ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Précédent
            </Text>
          </TouchableOpacity>

          {currentStep === steps.length - 1 ? (
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-primary"
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-black font-semibold">
                  Créer le produit
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={goToNextStep}
              className="px-6 py-3 rounded-xl bg-primary"
            >
              <Text className="text-black font-semibold">Suivant</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
