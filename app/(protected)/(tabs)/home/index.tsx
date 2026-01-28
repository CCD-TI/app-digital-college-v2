import ArrowRigth from "@/components/ArrowRigth";
import CardCurso from "@/components/CardCurso";
import MainActions from "@/components/home/MainActions";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProgressBarExperience from "@/components/ProgressBarExperience";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/auth/authStore";
import { withOpacity } from "@/utils/getColorByHex";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
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
  const { perfil, economia } = useAuthStore();
  const { completados, enProgreso } = useCursos();
  const navegateTo = () => {
    router.navigate("/misCursos");
  };
  const navegateToModulo = (id: string) => {
    router.navigate(`/curso/${id}`);
  };
  const avatarUrl = perfil?.perfil?.productos_usados.avatar || "";
  const marcoUrl = perfil?.perfil?.productos_usados.marco || "";
  return (
    <View style={[styles.absoluteFill, { backgroundColor: Colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.safeArea}>
          <StatusBar hidden={true} />

          {perfil && economia && (
            <View style={{ ...localStyles.headerContainer, justifyContent: 'space-between', gap: 10 }}>
              <ProfileAvatar avatarUrl={avatarUrl} marcoUrl={marcoUrl} size={60} />
              <View style={{ ...localStyles.headerTextContainer, gap: 10 }}>

                <View style={localStyles.balanceContainer}>
                  <Text style={localStyles.headerText}>{perfil.perfil.datos_usuario.nombres}</Text>
                  <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 5, borderRadius: 5, backgroundColor: withOpacity('#EDAF00', 0.1), paddingHorizontal: 6, paddingVertical: 2 }}>
                      <FontAwesome6 name="coins" size={24} color="#EDAF00" />
                      <Text style={{ color: "#EDAF00" }}>{economia.coins_balance}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 5, borderRadius: 5, backgroundColor: withOpacity('#53EAFD', 0.1), paddingHorizontal: 6, paddingVertical: 2 }}>
                      <FontAwesome6 name="diamond" size={24} color="#53EAFD" />
                      <Text style={{ color: "#53EAFD" }}>{economia.diamonds_balance}</Text>
                    </View>
                  </View>
                </View>
                <ProgressBarExperience economia={economia} progress={60} color="#00C950" />

              </View>
            </View>
          )}

          <MainActions/>
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
          {completados.length == 0 ? (
            <></>
          ) : (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
              </ScrollView>
            </>
          )}

          <View style={{ marginBottom: 140 }}></View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    backgroundColor: withOpacity('#FFFFFF', 0.1),
    borderRadius: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1

  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  balanceContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

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
