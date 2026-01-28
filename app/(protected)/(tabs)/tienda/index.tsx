import CurrencyBadge from "@/components/ui/CurrencyBadge";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { useAuthStore } from "@/store/auth/authStore";
import { Producto } from "@/store/auth/tienda_types";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Filter from "../../../../components/Filter";
import ProductoCard from "../../../../components/tienda/ProductoCard";
import { ProductoDetail } from "../../../../components/tienda/ProductoDetail";
import { useProductos } from "../../../../hooks/useProductos";

const ITEMS_PER_PAGE = 10;

export default function TiendaScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState<Producto[]>([]);
  const { economia } = useAuthStore();
  const { productoPaginated, isLoading, refetch } = useProductos(
    currentPage,
    ITEMS_PER_PAGE,
    selectedTypeId
  );
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  useEffect(() => {
    if (productoPaginated) {
      if (currentPage === 1) {
        setAllProducts(productoPaginated.data);
      } else {
        setAllProducts((prevProducts) => [
          ...prevProducts,
          ...productoPaginated.data,
        ]);
      }
    }
  }, [productoPaginated]);

  useEffect(() => {
    // Reset products and page when filter changes
    setCurrentPage(1);
    setAllProducts([]);
    refetch(); // Trigger refetch with new filter and page 1
  }, [selectedTypeId]);

  const loadMore = () => {
    if (
      !isLoading &&
      productoPaginated &&
      allProducts.length < productoPaginated.total
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSelectType = (typeId: number | null) => {
    setSelectedTypeId(typeId);
  };

  const handleProductPress = (producto: Producto) => {
    setSelectedProduct(producto);
  };

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  });

  const currentVisibleId = useRef<string | null>(null);

  const onViewableItemsChanged = useRef((viewableItems: any) => {
    if (viewableItems.length > 0) {
      currentVisibleId.current = viewableItems[0].item.uuid;
    }
  });

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={Colors.yellowDC} />
      </View>
    );
  };

  if (isLoading && allProducts.length === 0) {
    return (
      <View style={[styles.container, localStyles.center]}>
        <ActivityIndicator size="large" color={Colors.yellowDC} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={localStyles.header}>
        {economia && (
          <View style={localStyles.balanceContainer}>
            <CurrencyBadge icon="coins" amount={economia.coins_balance} color="#EDAF00" />
            <CurrencyBadge icon="gem" amount={economia.diamonds_balance} color="#53EAFD" />
          </View>
        )}
      </View>
      <Filter
        selectedTypeId={selectedTypeId}
        onSelectType={handleSelectType}
      />
      <FlatList
        data={allProducts}
        renderItem={({ item }) => (
          <ProductoCard
            key={item.uuid}
            producto={item}
            isActive={item.uuid === currentVisibleId.current}
            onPress={() => handleProductPress(item)}
          />
        )}
        keyExtractor={(item) => item.uuid}
        numColumns={2}
        columnWrapperStyle={localStyles.row}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        removeClippedSubviews
        windowSize={7}
        maxToRenderPerBatch={4}
        initialNumToRender={6}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        style={{marginTop:10}}
      />
      <ProductoDetail
        producto={selectedProduct}
        isVisible={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  balanceContainer: {
    flexDirection: "row",
    gap: 5
  },
  balanceText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});
