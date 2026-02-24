import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

// Icône de recherche
const SearchIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35"
      stroke="#888"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Icône de fermeture (effacer)
const CloseIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6l12 12"
      stroke="#888"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void; // Optionnel : action supplémentaire lors de l'effacement
  onSubmit?: () => void; // Optionnel : action lors de la soumission (clic sur "Rechercher")
}

export const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Rechercher...",
  onClear,
  onSubmit,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText("");
    if (onClear) onClear();
  };

  return (
    <View className="px-4 py-2">
      <View
        className={`
          flex-row items-center rounded-xl border bg-white px-3 shadow-sm
          ${isFocused ? "border-[#0f7b5f]" : "border-gray-200"}
        `}
      >
        <SearchIcon />
        <TextInput
          className="ml-2 flex-1 text-base text-gray-800 mb-1"
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} className="p-1">
            <CloseIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
