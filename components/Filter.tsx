import { Colors } from "@/constants/Colors";
import { withOpacity } from "@/utils/getColorByHex";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ProductTypeFilter {
  id: number | null;
  name: string;
}

const productTypeFilters: ProductTypeFilter[] = [
  { id: null, name: "All" },
  { id: 5, name: "Avatar" },
  { id: 1, name: "Marco" },
  { id: 2, name: "Tarjeta" },
  { id: 4, name: "Wallpaper" },
  { id: 6, name: "Video" },
  { id: 3, name: "Banner" },
];

const Filter = ({
  selectedTypeId,
  onSelectType,
}: {
  selectedTypeId: number | null;
  onSelectType: (tipoId: number | null) => void;
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10, gap: 10, height: 50 }}
    >
      {productTypeFilters.map((type) => (
        <TouchableOpacity
          key={type.name}
          style={[
            styles.tab,
            selectedTypeId === type.id && styles.activeTab,
          ]}
          onPress={() => onSelectType(type.id)}
        >
          <Text
            style={[
              styles.tabText,
              selectedTypeId === type.id && styles.activeTabText,
            ]}
          >
            {type.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent:'center',
    alignItems:'center'
  },
  activeTab: {
    backgroundColor: withOpacity(Colors.yellowDC, 0.3),
    borderColor: Colors.yellowDC,
  },
  tabText: {
    color: "#FFFFFF",
  },
  activeTabText: {
    color: Colors.yellowDC,
    fontWeight: "bold",
  },
});

export default Filter;
