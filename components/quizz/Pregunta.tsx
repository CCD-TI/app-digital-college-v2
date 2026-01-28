import { View, Text, Image } from "react-native";
import React from "react";

interface PreguntaProps {
  preguntaActual: number;
  enunciado: string;
  imagen?: string | null;
  totalPreguntas: number;
}

export default function Pregunta({
  preguntaActual,
  totalPreguntas,
  enunciado,
  imagen,
}: PreguntaProps) {
  return (
    <View
      style={{
        borderRadius: 8,
        width: "auto",
        height: "auto",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16, marginBottom: 10 }}>
        Pregunta {preguntaActual} / {totalPreguntas}
      </Text>
      <Text
        style={{
          color: "#fff",
          fontSize: 16,
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        {enunciado}
      </Text>
      {imagen != null && (
        <Image
          source={{ uri: imagen }}
          style={{
            marginVertical: 10,
            width: 250,
            height: 250,
            borderRadius: 8,
            resizeMode: "contain",
          }}
        />
      )}
    </View>
  );
}
