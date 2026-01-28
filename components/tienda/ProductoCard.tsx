import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { styles } from "@/constants/Styles";
import { Producto } from "@/store/auth/tienda_types";
import { withOpacity } from "@/utils/getColorByHex";
import Svg, { G, Path } from "react-native-svg";
import CurrencyBadge from "../ui/CurrencyBadge";

interface ProductoCardProps {
  producto: Producto;
  isActive: boolean;
  onPress: () => void;
}

const ProductoCard = ({ producto, isActive, onPress }: ProductoCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, localStyles.card]}>
      <Svg
        style={{ position: "absolute", bottom: -7, left: 0 }}
        viewBox="0 0 356 761"
        fill="none"
        preserveAspectRatio="none"
      >
        <G>
          <Path d="M233.508 738.507L226.022 748.507H127.341L121.508 738.507H233.508Z" fill="#51C1EB" />
          <Path d="M13.5078 279.507V722.677L31.1039 738.507H325.14L342.508 722.882V279.507" strokeWidth="2.30139" strokeMiterlimit="10" />
        </G>
      </Svg>
      <View
        style={[localStyles.container, {}]}
      >
        <Image
          source={{ uri: producto.url }}
          style={[localStyles.image]}
          contentFit="contain"
          transition={300}
        />
        <View style={localStyles.textContainer}>
          <Text style={localStyles.title}>{producto.nombre}</Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 10, marginTop: 5 }}>
            <CurrencyBadge icon="coins" amount={producto.monedas} color="#EDAF00" size={20}/>
            <CurrencyBadge icon="gem" amount={producto.diamantes} color="#53EAFD" size={20} />
          </View>
          
        </View>
      </View>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: withOpacity("#51C1EB", 0.1),
    position: "relative",
    borderColor: "#51C1EB",
    borderWidth: 1,
    flex: 1,
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  activeBorder: {
    borderColor: "yellow",
    borderWidth: 2,
  },
  image: {
    width: 150,
    height: 150,
    objectFit: "contain",
    borderRadius: 5,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "Orbitron",
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    color: "#EDAF00",
    marginTop: 5,
  },
});
export default memo(ProductoCard);