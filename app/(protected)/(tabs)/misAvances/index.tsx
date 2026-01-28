import { useAuthStore } from "@/store/auth/authStore";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Banner from "@/components/Banner";
import Progreso from "@/components/Progreso";
import { Colors } from "@/constants/Colors";
import { withOpacity } from "@/utils/getColorByHex";
import { router } from "expo-router";
import { useCursos } from "../../../../hooks/useCursos";

export default function MisAvances() {
  const { nombres } = useAuthStore();
  const { enProgreso, completados } = useCursos();

  const navegateToModulo = (id: string) => {
    router.navigate(`/curso/${id}`);
  };

  return (
    <View
      style={[
        styles.safeArea,
        { position: "relative", backgroundColor: Colors.background },
      ]}
    >
      <Banner />
      <ScrollView
        style={{
          flex: 1,
          maxWidth: "100%",
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={{ marginTop: 80, marginLeft: 25 }}>
            <Text style={[styles.text, { fontSize: 20 }]}>
              Progreso de{" "}
              <Text style={{ fontWeight: "bold", color: "#05ABDD" }}>
                {" "}
                {nombres} 🚀
              </Text>
            </Text>
            <Text
              style={{
                color: "#F9B233",
                marginTop: 25,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Misiones en progreso
            </Text>
            <Text
              style={{
                color: "#ffff",
                marginTop: 5,
                marginBottom: 15,
                fontSize: 18,
              }}
            >
              Veamos los avances
            </Text>
            <View style={{ marginRight: 25, marginTop: 10 }}>
              {}
              {enProgreso.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navegateToModulo(item.version_curso_id)}
                >
                  <Progreso
                    title={item.curso_nombre}
                    progreso={item.progress}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={{
                color: "#F9B233",
                marginTop: 25,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Misiones completados
            </Text>
            <Text
              style={{
                color: "#ffff",
                marginTop: 5,
                fontSize: 18,
                marginBottom: 15,
              }}
            >
              Veamos tus logros ¡Revisa tu racha!
            </Text>
            <View style={{ marginRight: 25, marginTop: 10, marginBottom: 120 }}>
              {}
              {completados.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginRight: 20,
                    padding: 20,
                    borderRadius: 10,
                    marginBottom: 20,
                    backgroundColor: withOpacity("#05ABDD", 0.3),
                    borderColor: "#05ABDD",
                    borderWidth: 1,
                  }}
                  onPress={() => navegateToModulo(item.version_curso_id)}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#F9B233",
                      }}
                    >
                      {item.curso_nombre}
                    </Text>

                    <Text
                      style={{
                        fontWeight: "semibold",
                        marginTop: 20,
                        color: "#ffff",
                      }}
                    >
                      Finalizado
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    flex: 1,
    position: "relative",
  },
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Hace que la imagen ocupe toda la pantalla
    justifyContent: "center", // Centra el contenido sobre la imagen
    alignItems: "center", // Centra el contenido sobre la imagen
  },
  text: {
    color: "#fff", // Asegura que el texto sea blanco
    fontSize: 24,
    fontWeight: "bold",
  },
});
