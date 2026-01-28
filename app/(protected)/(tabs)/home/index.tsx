import ArrowRigth from "@/components/ArrowRigth";
import CardCurso from "@/components/CardCurso";
import MainActions from "@/components/home/MainActions";
import PerfilHome from "@/components/home/PerfilHome";
import { Colors } from "@/constants/Colors";
import { withOpacity } from "@/utils/getColorByHex";
import { router } from "expo-router";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCursos } from "../../../../hooks/useCursos";

const { height: windowHeight } = Dimensions.get("window");

export default function Home() {

  const { completados, enProgreso } = useCursos();
  const navegateTo = () => {
    router.navigate("/misCursos");
  };
  const navegateToModulo = (id: string) => {
    router.navigate(`/curso/${id}`);
  };

  return (
    <View style={[styles.absoluteFill, { backgroundColor: Colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.safeArea}>
          <StatusBar hidden={true} />

          <PerfilHome />
          <MainActions />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 4,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text
                style={[
                  styles.text,
                  { fontSize: 16, marginBottom: 20, marginRight: 20 },
                ]}
              >
                En progreso:
              </Text>
              <View
                style={{
                  backgroundColor: withOpacity("#05ABDD", 0.5),
                  borderColor: "#05ABDD",
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 2,
                  maxHeight: 25,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                >
                  {enProgreso.length}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={navegateTo}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignContent: "center",
                }}
              >
                <Text style={{ color: "#fff", marginRight: 10, fontSize: 16 }}>
                  ver más
                </Text>
                <ArrowRigth />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginRight: 36, gap: 10 }}
          >
            {enProgreso.map((item, index) => (
              <CardCurso
                key={index}
                id={item.version_curso_id}
                name={item.curso_nombre}
                imageUrl={item.url_portada}
                colors={item.colores}
                grado={item.grado_nombre}
                nivel={item.nivel_nombre}
              />
            ))}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 4,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Text
                style={[
                  styles.text,
                  { fontSize: 16, marginBottom: 20, marginRight: 20 },
                ]}
              >
                Completados:
              </Text>
              <View
                style={{
                  backgroundColor: withOpacity("#83B248", 0.5),
                  borderColor: "#83B248",
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 2,
                  maxHeight: 25,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#ffff",
                    fontWeight: "bold",
                  }}
                >
                  {completados.length}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={navegateTo}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignContent: "center",
                }}
              >
                {completados.length == 0 ? (
                  <></>
                ) : (
                  <>
                    <Text
                      style={{ color: "#fff", marginRight: 10, fontSize: 16 }}
                    >
                      ver más
                    </Text>
                    <ArrowRigth />
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
          {completados.length !== 0 && <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {completados.map((item, index) => (
              <CardCurso
                key={index}
                id={item.version_curso_id}
                name={item.curso_nombre}
                imageUrl={item.url_portada}
                colors={item.colores}
                grado={item.grado_nombre}
                nivel={item.nivel_nombre}
              />
            ))}
          </ScrollView>}

          <View style={{ marginBottom: 140 }}></View>
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
  },
  carousel: {
    width: "100%",
    height: windowHeight * 0.25, // 25% de la altura de la pantalla
    borderRadius: 20,
    borderColor: Colors.greenBlueDC,
    borderWidth: 2,
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  scrollView: {
    flex: 1,
    maxWidth: "100%",
  },
  scrollViewContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
