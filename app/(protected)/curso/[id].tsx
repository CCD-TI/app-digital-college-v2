import Acordion from "@/components/curso/Accordion";
import TabSelector from "@/components/curso/TabSelector";
import IconCheck from "@/components/IconCheck";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { useAuthStore } from "@/store/auth/authStore";
import { withOpacity } from "@/utils/getColorByHex";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCursoModulos } from "../../../hooks/useCursoModulos";

export default function modulo() {
  const { id } = useLocalSearchParams();
  const { nombres } = useAuthStore();
  const { cursoData, isLoading } = useCursoModulos(
    Array.isArray(id) ? id[0] : id
  );
  const [expanded, setExpanded] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const [currentTab, setCurrentTab] = useState(0);

  if (isLoading || !cursoData) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={Colors.yellowDC} />
      </View>
    );
  }

  const { curso, bimestres, libroUrl } = cursoData;
  const modulos = bimestres[currentTab]?.modulos ?? [];

  return (
    <View style={styles.container}>
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
        <TouchableOpacity
          style={{ marginTop: 40 }}
          onPress={() => router.replace("/home")}
        >
          <IconSymbol
            name="arrow.left"
            color={Colors.yellowDC}
            size={40}
            style={{ marginLeft: 16, marginTop: 10 }}
          />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={[styles.text, { fontSize: 20 }]}>
            Misiones de{" "}
            <Text style={{ fontWeight: "bold", color: "#05ABDD" }}>
              {" "}
              {nombres} 🧑‍🚀
            </Text>
          </Text>
          <Text
            style={{
              color: "#ffff",
              marginTop: 10,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            <Text style={{ color: "#05ABDD" }}>{curso.nombre}</Text> | Grado ID:{" "}
            {curso.gradoId}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 20,
            }}
          >
            {bimestres.map((item, index) => (
              <TouchableOpacity
                key={"View" + index}
                onPress={() => setCurrentTab(index)}
              >
                <View
                  style={{
                    width: 73,
                    height: 70,
                    backgroundColor:
                      currentTab == index
                        ? withOpacity("#05ABDD", 0.3)
                        : withOpacity("#FFFFFF", 0.5),
                    borderColor: currentTab == index ? "#05ABDD" : "#FFFFFF",
                    borderWidth: 1,
                    borderRadius: 5,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  {currentTab == index ? (
                    <View
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                        marginHorizontal: "auto",
                        marginBottom: 3,
                      }}
                    >
                      <IconCheck />
                    </View>
                  ) : (
                    ""
                  )}

                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {item.bimestre}° Bim.
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {modulos.map((modulo, index) => (
            <Acordion
              key={modulo.id}
              title={"Tema " + (index + 1)}
              subtitle={modulo.titulo}
              expanded={expanded === index}
              onPress={() => {
                setExpanded(expanded === index ? null : index);
                setCurrentPage(expanded === index ? 0 : modulo.page);
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <TabSelector
                  modulo={modulo}
                  libroUrl={libroUrl}
                  currentPage={currentPage}
                />
              </View>
            </Acordion>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
