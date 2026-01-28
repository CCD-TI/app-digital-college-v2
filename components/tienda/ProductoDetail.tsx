import { Colors } from "@/constants/Colors";
import { useComprarProducto } from "@/hooks/tienda/useComprarProducto";
import { Producto } from "@/store/auth/tienda_types";
import { withOpacity } from "@/utils/getColorByHex";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CurrencyBadge from "../ui/CurrencyBadge";

interface ProductoDetailProps {
  producto: Producto | null;
  isVisible: boolean;
  onClose: () => void;
}

export const ProductoDetail = ({
  producto,
  isVisible,
  onClose,
}: ProductoDetailProps) => {
  const { comprarProducto, isLoading, error, isSuccess, reset } =
    useComprarProducto();

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  useEffect(() => {
    if (isSuccess) {
      Alert.alert("Compra exitosa", "¡Has adquirido un nuevo item!");
      handleClose();
    }
  }, [isSuccess, handleClose]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      reset();
    }
  }, [error, reset]);

  if (!producto) {
    return null;
  }

  const handleBuy = () => {
    comprarProducto(producto.uuid);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <FontAwesome name="times" size={24} color="red" />
          </TouchableOpacity>

          <Image
            source={{ uri: producto.url }}
            style={styles.image}
            contentFit="contain"
          />
          <Text style={styles.title}>{producto.nombre}</Text>
          <Text style={styles.description}>{producto.tipo.nombre}</Text>

          <View style={styles.costContainer}>
            <CurrencyBadge icon="coins" amount={producto.monedas} color="#EDAF00" size={20}/>
            <CurrencyBadge icon="gem" amount={producto.diamantes} color="#53EAFD" size={20} />
          </View>

          <TouchableOpacity
            style={styles.buyButton}
            onPress={handleBuy}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buyButtonText}>Comprar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    borderRadius: 99999,
    backgroundColor: withOpacity("#FF0000", 0.4),
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  costContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  costItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: 10,
  },
  costText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },

  buyButton: {
    backgroundColor: Colors.yellowDC,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
