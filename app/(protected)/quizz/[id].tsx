import { useBottomSheet } from "@/contexts/BottomSheetContext";
import Banner from "@/components/Banner";
import { styles } from "@/constants/Styles";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Final } from "../../../components/quizz/Final";
import Pares from "../../../components/quizz/Pares";
import Question from "../../../components/quizz/Pregunta";
import Respuesta from "../../../components/quizz/Respuesta";
import Timer from "../../../components/quizz/Timer";
import {
  EnviarRespuestasPayload,
  useEnviarRespuestas,
} from "../../../hooks/quizz/useEnviarRespuestas";
import { useObtenerPreguntasEvaluacion } from "../../../hooks/quizz/useObtenerPreguntasEvaluacion";

const stylesExam = StyleSheet.create({
  button: {
    backgroundColor: "#05ABDD",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function Quizz() {
  const { id, examen_id } = useLocalSearchParams();
  const { obtenerPreguntas, data } = useObtenerPreguntasEvaluacion();
  const { enviarRespuestas, success } = useEnviarRespuestas();
  const { bottomSheetRef } = useBottomSheet();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [respuestas, setRespuestas] = useState<{
    [preguntaId: number]: string[] | any;
  }>({});

  useEffect(() => {
    if (!data) {
      obtenerPreguntas(Array.isArray(id) ? id[0] : id);
    }
  }, [data]);

  useEffect(() => {
    if (data?.evaluacionPreguntas) {
      setRespuestas((prev) => {
        const nuevas = { ...prev };
        data.evaluacionPreguntas.forEach((pregunta) => {
          if (!nuevas[pregunta.pregunta.id]) {
            nuevas[pregunta.pregunta.id] = ["SIN RESPUESTA"];
          }
        });
        return nuevas;
      });
    }
  }, [data]);

  const handleRespuesta = (preguntaId: number, respuesta: string[]) => {
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: respuesta,
    }));
  };

  const finalizarEvaluacion = async () => {
    const respuestasArray = preguntas.map((pregunta) => ({
      preguntaId: pregunta.pregunta.id,
      respuesta:
        respuestas[pregunta.pregunta.id] &&
        respuestas[pregunta.pregunta.id].length > 0
          ? respuestas[pregunta.pregunta.id]
          : ["SIN RESPUESTA"],
    }));

    const payload: EnviarRespuestasPayload = {
      usuarioEvaluacionId: Array.isArray(examen_id) ? examen_id[0] : examen_id,
      respuestas: respuestasArray,
    };

    const respuesta = await enviarRespuestas(payload);
    if (success) {
      bottomSheetRef.current?.expand();
      setTimeout(() => {
        router.back();
      }, 2000);
    }

    //await enviarRespuestas(payload).then((data) => console.log(data));
    //router.push("/quizz/resultado");
  };

  const preguntas = data?.evaluacionPreguntas || [];
  const total = preguntas.length;
  const actual = preguntas[currentIndex];

  const avanzar = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const retroceder = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Banner />
      <Timer totalTime={6 * 60} />
      {actual && (
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <Question
            preguntaActual={currentIndex + 1}
            totalPreguntas={total}
            enunciado={actual.pregunta.enunciado}
            imagen={actual.pregunta.imagen}
          />
          {actual.pregunta.tipo === "relacionar" ? (
            <Pares
              pares={actual.pregunta.pares}
              respuestas={respuestas}
              setRespuestas={setRespuestas}
              preguntaId={actual.pregunta.id}
            />
          ) : (
            <Respuesta
              opciones={actual.pregunta.opciones}
              tipo={actual.pregunta.tipo}
              respuestas={respuestas}
              setRespuestas={setRespuestas}
              preguntaId={actual.pregunta.id}
            />
          )}

          {/* Botones de navegación */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
          >
            {currentIndex > 0 && (
              <TouchableOpacity onPress={retroceder}>
                <Text style={stylesExam.button}>Anterior</Text>
              </TouchableOpacity>
            )}

            {currentIndex < total - 1 ? (
              <TouchableOpacity onPress={avanzar}>
                <Text style={stylesExam.button}>Siguiente</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={finalizarEvaluacion}>
                <Text style={stylesExam.button}>Finalizar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      <Final />
    </View>
  );
}
