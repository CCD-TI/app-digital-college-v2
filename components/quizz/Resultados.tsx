import { Colors } from "@/constants/Colors";
import { withOpacity } from "@/utils/getColorByHex";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useHistoricoExamenes } from "../../hooks/quizz/useHistoricoExamenes";
import { useIniciarExamen } from "../../hooks/quizz/useIniciarExamen";

interface Prop {
  evaluacionId: string | null;
  usuarioId: string | null;
}

export default function Resultados({ evaluacionId, usuarioId }: Prop) {
  const { finalizados, enProgreso } = useHistoricoExamenes(
    usuarioId,
    evaluacionId
  );

  const { iniciarExamen } = useIniciarExamen();

  const getCalificacionColor = (nota: number) => {
    if (nota >= 85) return "#8BC34A"; // verde
    if (nota >= 50) return "#FFC107"; // amarillo
    return "#F44336"; // rojo
  };

  const handleViewQuizz = async (evaluacionId: number | null) => {
    const data = await iniciarExamen({ evaluacionId, usuarioId });

    if (data?.examen.id) {
      router.replace(
        `/quizz/${data.examen.evaluacionId}?examen_id=${data?.examen.id}`
      );
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, styles.column]}>Intento</Text>
          <Text style={[styles.headerText, styles.column]}>Calificación</Text>
        </View>
        {finalizados
          ?.sort((a, b) => a.intento - b.intento)
          .map((demo, index) => (
            <View style={styles.row} key={index}>
              <Text style={[styles.cell, styles.column, { padding: 10 }]}>
                {demo.intento}
              </Text>
              <Text
                style={[
                  styles.cell,
                  styles.column,
                  {
                    backgroundColor: withOpacity(
                      getCalificacionColor(demo.calificacion),
                      0.3
                    ),
                    borderColor: getCalificacionColor(demo.calificacion),
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 30,
                    width: "auto",
                  },
                ]}
              >
                {demo.calificacion}/100
              </Text>
            </View>
          ))}
      </View>
      {enProgreso.length == 0 ? (
        <TouchableOpacity
          style={{
            backgroundColor: withOpacity(Colors.yellowDC, 0.3),
            borderColor: Colors.yellowDC,
            borderWidth: 1,
            borderRadius: 30,
            padding: 10,
            marginTop: 20,
            alignContent: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            handleViewQuizz(parseInt(evaluacionId ? evaluacionId : ""))
          }
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
            }}
          >
            EMPECEMOS
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ color: "#fff" }}>TIENES UNA EVALUACIÓN ACTIVA</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    borderColor: "#05ABDD",
    backgroundColor: withOpacity("#05ABDD", 0.1),
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#555",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  cell: {
    color: "#FFF",
    fontSize: 15,
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
});
