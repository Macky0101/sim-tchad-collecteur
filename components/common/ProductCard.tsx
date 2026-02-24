// ─────────────────────────────────────────────────────────────────────
// ProductCard.tsx  +  MasonryProductList
// React Native + NativeWind (className) -- True masonry layout
// ─────────────────────────────────────────────────────────────────────
//
// IMPORTANT: FlatList with numColumns={2} forces row alignment, which
// is NOT masonry. For a true Pinterest/AliExpress masonry layout where
// shorter cards let the next card "fill the gap", we use TWO FlatList
// columns side-by-side. Items are distributed by estimated height to
// balance column lengths.
//
// ─── Usage ────────────────────────────────────────────────────────────
//
//   import { MasonryProductList } from "@/components/ProductCard";
//
//   <MasonryProductList
//     products={products}
//     onProductPress={(product) => router.push(`/product/${product.id}`)}
//     onEndReached={() => fetchNextPage()}
//     ListHeaderComponent={<MyHeader />}
//   />
//
// ─────────────────────────────────────────────────────────────────────

import { Product } from "@/types/product";
import React, { useCallback, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

// ─── Icons ────────────────────────────────────────────────────────────

function SearchCameraIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke="#555" strokeWidth={1.5} />
      <Path
        d="M20 20l-3.5-3.5"
        stroke="#555"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function VerifiedCheckIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12l5 5L20 7"
        stroke="#f97316"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────

export function ProductCard({
  product,
  onPress,
  columnWidth,
}: {
  product: Product;
  onPress?: () => void;
  /** Width of the column this card sits in (auto-calculated by MasonryProductList) */
  columnWidth?: number;
}) {
  const imageSource =
    typeof product.photo === "string" ? { uri: product.photo } : product.photo;
  const aspectRatio = product.imageAspectRatio ?? 1;

  return (
    <Pressable
      onPress={onPress}
      style={styles.card}
      className="mb-2 overflow-hidden rounded-lg bg-white"
    >
      {/* ── Image ── */}
      <View className="w-full bg-[#f5f5f5]">
        <Image
          source={imageSource}
          style={{ width: "100%", aspectRatio }}
          resizeMode="cover"
          accessibilityLabel={product.name}
        />
        {/* Search icon overlay */}
        <View
          style={styles.iconOverlay}
          className="absolute bottom-2 left-2 rounded-full bg-white/80 p-1.5"
        >
          <SearchCameraIcon />
        </View>
      </View>

      {/* ── Content ── */}
      <View className="px-2 pb-2.5 pt-2">
        {/* Nom du produit */}
        <Text
          className="text-xs font-medium leading-4 text-[#222]"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.name}
        </Text>

        {/* Prix */}
        <Text className="mt-1 text-[13px] font-bold text-[#1a1a1a]">
          {product.price}
        </Text>

        {/* Quantité et unité de mesure */}
        {product.quantity ? (
          <Text className="mt-1 text-[10px] text-[#666]">
            Quantité: {product.quantity} {product.measure_used || ""}
          </Text>
        ) : null}

        {/* Description courte (1 ligne) */}
        {product.description ? (
          <Text
            className="mt-1 text-[10px] text-[#888]"
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            {product.description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

// ─── Height estimation for column balancing ───────────────────────────
// This approximates card height to distribute items evenly between columns

const SCREEN_WIDTH = Dimensions.get("window").width;
const COLUMN_GAP = 8;
const HORIZONTAL_PADDING = 8;
const COLUMN_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / 2;

function estimateCardHeight(product: Product): number {
  const aspectRatio = product.imageAspectRatio ?? 1;
  const imageHeight = COLUMN_WIDTH / aspectRatio;
  // Text content: name (~32px) + price (~18px) + sales (~14px) + verified (~16px) + padding (~20px)
  const textHeight =
    32 + 18 + (product.salesCount ? 14 : 0) + (product.verified ? 16 : 0) + 20;
  return imageHeight + textHeight + 8; // 8 = marginBottom
}

// ─── MasonryProductList ───────────────────────────────────────────────
//
// Two FlatList columns that scroll together via Animated.ScrollView.
// Items are distributed by estimated height so columns stay balanced.
// Each FlatList only renders visible items = handles millions of items.
//
// How it works:
// 1. Products are split into left/right columns based on cumulative height
// 2. Both columns are inside an Animated.ScrollView (the scroll parent)
// 3. Each FlatList has scrollEnabled={false} so the parent controls scrolling
// 4. onEndReached triggers on the parent ScrollView for infinite loading

interface MasonryProductListProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListHeaderComponent?: React.ReactElement;
  contentContainerStyle?: object;
  /** Extra bottom padding (for floating tab bar) */
  bottomPadding?: number;
}

export function MasonryProductList({
  products,
  onProductPress,
  onEndReached,
  onEndReachedThreshold = 0.3,
  ListHeaderComponent,
  contentContainerStyle,
  bottomPadding = 120,
}: MasonryProductListProps) {
  const onEndReachedCalled = useRef(false);

  // Split products into two columns using height-based balancing
  const { leftColumn, rightColumn } = useMemo(() => {
    const left: Product[] = [];
    const right: Product[] = [];
    let leftHeight = 0;
    let rightHeight = 0;

    for (const product of products) {
      const h = estimateCardHeight(product);
      // Place in the shorter column
      if (leftHeight <= rightHeight) {
        left.push(product);
        leftHeight += h;
      } else {
        right.push(product);
        rightHeight += h;
      }
    }

    return { leftColumn: left, rightColumn: right };
  }, [products]);

  // Scroll handler for infinite loading
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!onEndReached) return;
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;
      const distanceFromEnd =
        contentSize.height - layoutMeasurement.height - contentOffset.y;
      const threshold = layoutMeasurement.height * onEndReachedThreshold;

      if (distanceFromEnd < threshold) {
        if (!onEndReachedCalled.current) {
          onEndReachedCalled.current = true;
          onEndReached();
        }
      } else {
        onEndReachedCalled.current = false;
      }
    },
    [onEndReached, onEndReachedThreshold],
  );

  // Render a single card
  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        columnWidth={COLUMN_WIDTH}
        onPress={onProductPress ? () => onProductPress(item) : undefined}
      />
    ),
    [onProductPress],
  );

  // Key extractors
  const leftKeyExtractor = useCallback(
    (item: Product) => `left-${item.id}`,
    [],
  );
  const rightKeyExtractor = useCallback(
    (item: Product) => `right-${item.id}`,
    [],
  );

  return (
    <Animated.ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        { paddingHorizontal: HORIZONTAL_PADDING, paddingBottom: bottomPadding },
        contentContainerStyle,
      ]}
    >
      {ListHeaderComponent}

      <View className="flex-row" style={{ gap: COLUMN_GAP }}>
        {/* Left column */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={leftColumn}
            renderItem={renderItem}
            keyExtractor={leftKeyExtractor}
            scrollEnabled={false}
            removeClippedSubviews={Platform.OS !== "web"}
            windowSize={5}
            maxToRenderPerBatch={10}
            initialNumToRender={8}
          />
        </View>

        {/* Right column */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={rightColumn}
            renderItem={renderItem}
            keyExtractor={rightKeyExtractor}
            scrollEnabled={false}
            removeClippedSubviews={Platform.OS !== "web"}
            windowSize={5}
            maxToRenderPerBatch={10}
            initialNumToRender={8}
          />
        </View>
      </View>
    </Animated.ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e0e0e0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconOverlay: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});
