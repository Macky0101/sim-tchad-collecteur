import { Product } from "@/types/product";
import React, { useCallback, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
} from "react-native";
import { UserProductCard } from "./UserProductCard";

const SCREEN_WIDTH = Dimensions.get("window").width;
const COLUMN_GAP = 8;
const HORIZONTAL_PADDING = 8;
const COLUMN_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / 2;

// Estimation simplifiée de la hauteur pour équilibrer les colonnes
function estimateCardHeight(product: Product): number {
  const aspectRatio = product.imageAspectRatio ?? 1;
  const imageHeight = COLUMN_WIDTH / aspectRatio;
  const textHeight = 32 + 18 + 20; // nom + prix + padding
  return imageHeight + textHeight + 8;
}

interface UserMasonryProductListProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListHeaderComponent?: React.ReactElement;
  contentContainerStyle?: object;
  bottomPadding?: number;
}

export function UserMasonryProductList({
  products,
  onProductPress,
  onEdit,
  onDelete,
  onEndReached,
  onEndReachedThreshold = 0.3,
  ListHeaderComponent,
  contentContainerStyle,
  bottomPadding = 120,
}: UserMasonryProductListProps) {
  const onEndReachedCalled = useRef(false);

  const { leftColumn, rightColumn } = useMemo(() => {
    const left: Product[] = [];
    const right: Product[] = [];
    let leftHeight = 0;
    let rightHeight = 0;

    for (const product of products) {
      const h = estimateCardHeight(product);
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

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!onEndReached) return;
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;
      const distanceFromEnd =
        contentSize.height - layoutMeasurement.height - contentOffset.y;
      const threshold = layoutMeasurement.height * onEndReachedThreshold;
      if (distanceFromEnd < threshold && !onEndReachedCalled.current) {
        onEndReachedCalled.current = true;
        onEndReached();
      } else {
        onEndReachedCalled.current = false;
      }
    },
    [onEndReached, onEndReachedThreshold],
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <UserProductCard
        product={item}
        columnWidth={COLUMN_WIDTH}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
    [onEdit, onDelete],
  );

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
