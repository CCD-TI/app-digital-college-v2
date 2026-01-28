import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { Colors } from "@/constants/Colors";

interface Props {
  opciones: string[] | null;
  tipo: string | null;
  respuestas: { [preguntaId: number]: string[] };
  setRespuestas: React.Dispatch<
    React.SetStateAction<{ [preguntaId: number]: string[] }>
  >;
  preguntaId: number;
}

export default function Respuesta({
  opciones,
  tipo,
  respuestas,
  setRespuestas,
  preguntaId,
}: Props) {
  const [seleccion, setSeleccion] = useState(
    tipo === "multiple" ? Array(opciones?.length).fill(false) : -1
  );

  const value = respuestas[preguntaId] || [];

  // Sincroniza el estado interno cuando value cambia
  useEffect(() => {
    if (tipo === "multiple") {
      setSeleccion(
        opciones?.map((_, idx) => value.includes(opciones[idx])) ?? []
      );
    } else {
      setSeleccion(opciones?.findIndex((op) => value[0] === op) ?? -1);
    }
  }, [value, opciones, tipo]);

  // Llama a setRespuestas al montar si value está vacío
  useEffect(() => {
    if ((!value || value.length === 0) && opciones && opciones.length > 0) {
      setRespuestas((prev) => ({
        ...prev,
        [preguntaId]: ["SIN RESPUESTA"],
      }));
      setSeleccion(opciones?.findIndex((op) => value[0] === op) ?? -1);
    }
  }, [opciones, value, preguntaId, setRespuestas]);

  const handlePress = (idx: number) => {
    if (tipo === "multiple") {
      const nuevo = Array.isArray(seleccion) ? [...seleccion] : [];
      nuevo[idx] = !nuevo[idx];
      setSeleccion(nuevo);
      const seleccionadas = opciones?.filter((_, i) => nuevo[i]) ?? [];
      setRespuestas((prev) => ({
        ...prev,
        [preguntaId]:
          seleccionadas.length > 0 ? seleccionadas : ["SIN RESPUESTA"],
      }));
    } else {
      setSeleccion(idx);
      setRespuestas((prev) => ({
        ...prev,
        [preguntaId]: [opciones?.[idx] ?? "SIN RESPUESTA"],
      }));
    }
  };

  return (
    <View>
      {opciones?.map((opcion, idx) => (
        <TouchableOpacity
          key={idx}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
          onPress={() => handlePress(idx)}
          activeOpacity={0.7}
        >
          <Checkbox
            value={
              tipo === "multiple"
                ? (seleccion as boolean[])[idx]
                : (seleccion as number) === idx
            }
            onValueChange={() => handlePress(idx)}
            color={
              (
                tipo === "multiple"
                  ? (seleccion as boolean[])[idx]
                  : (seleccion as number) === idx
              )
                ? Colors.blueBoldDC
                : "#fff"
            }
          />
          <View style={{ marginHorizontal: 10 }} />
          <Text style={{ color: "#fff" }}>{opcion}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
