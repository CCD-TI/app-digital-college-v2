import CardCurso from "@/components/CardCurso";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/auth/authStore";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Filter from "../../../components/miscursos/Filter";
import { useCursos } from "../../../hooks/useCursos";

export default function MisCursos() {
  const { nombres } = useAuthStore();
  const { cursos } = useCursos();
  const [selectedGrado, setSelectedGrado] = useState<number | null>(null);
  const [selectedNivel, setSelectedNivel] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);

  const filteredCursos = useMemo(() => {
    return cursos.filter(curso => {
      const gradoMatch = !selectedGrado || curso.grado_id === selectedGrado;
      const nivelMatch = !selectedNivel || curso.nivel_id === selectedNivel;
      const areaMatch = !selectedArea || curso.area_id === selectedArea;
      return gradoMatch && nivelMatch && areaMatch;
    });
  }, [cursos, selectedGrado, selectedNivel, selectedArea]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.background }]}>
      <View>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => router.replace("/home")}
        >
          <IconSymbol
            name="arrow.left"
            color={Colors.yellowDC}
            size={40}
            style={{ marginLeft: 16, marginTop: 10 }}
          />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 25 }}>
          <Text style={[styles.text, { fontSize: 20 }]}>
            Misiones de{" "}
            <Text style={{ fontWeight: "bold", color: "#05ABDD" }}>
              {" "}
              {nombres} 🧑‍🚀
            </Text>
          </Text>
        </View>
      </View>


      <Filter
        selectedGrado={selectedGrado}
        setSelectedGrado={setSelectedGrado}
        selectedNivel={selectedNivel}
        setSelectedNivel={setSelectedNivel}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
      />

      <FlatList
        data={filteredCursos}
        numColumns={2}
        keyExtractor={(item) => item.version_curso_id.toString()}
        renderItem={({ item }) => (
          <CardCurso
            id={item.version_curso_id}
            name={item.curso_nombre}
            imageUrl={item.url_portada}
            colors={item.colores}
            grado={item.grado_nombre}
            nivel={item.nivel_nombre}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20, marginBottom: 80 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 10,
    width: "100%",
  },
});
