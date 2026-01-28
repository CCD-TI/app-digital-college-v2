import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, View } from "react-native";
import ArrowInsertIcon from "./ArrowInsert";

interface IProgreso {
  title: string;
  progreso: number;
}

export default function Progreso({ title, progreso }: IProgreso) {
  return (
    <View
      style={{
        backgroundColor: "#000000",
        padding: 15,
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 10,
        width: "100%",
      }}
    >
      <Text
        style={{
          color: "#ffff",
          fontSize: 18,
          fontWeight: "semibold",
          maxWidth: "60%",
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            marginRight: 10,
            fontSize: 16,
          }}
        >
          Faltan
          <Text style={{ fontWeight: "bold", color: Colors.yellowDC }}>
            {" "}
            {progreso}{" "}
          </Text>
          temas
        </Text>
        <ArrowInsertIcon />
      </View>
    </View>
  );
}
