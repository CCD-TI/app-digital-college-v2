import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { withOpacity } from "@/utils/getColorByHex";

interface Props {
  pares: { derecha: string; izquierda: string }[] | null;
  respuestas: { [preguntaId: number]: string[] };
  setRespuestas: React.Dispatch<
    React.SetStateAction<{ [preguntaId: number]: string[] }>
  >;
  preguntaId: number;
}

const Pares: React.FC<Props> = ({
  pares,
  respuestas,
  setRespuestas,
  preguntaId,
}) => {
  const leftItems =
    pares?.map((p, i) => ({ key: `left-${i}`, izquierda: p.izquierda })) || [];

  const [rightItems, setRightItems] = useState(
    pares?.map((p, i) => ({ key: `right-${i}`, derecha: p.derecha })) || []
  );

  const value = respuestas[preguntaId] || [];

  const colors: string[] = [
    withOpacity("#F9B233", 0.2),
    withOpacity("#83B248", 0.2),
    withOpacity("#05ABDD", 0.2),
    withOpacity("#DD0C05", 0.2),
  ];

  // Inicializa respuestas si está vacío
  useEffect(() => {
    if ((!value || value.length === 0) && pares) {
      setRespuestas((prev) => ({
        ...prev,
        [preguntaId]: leftItems.map((item, index) => ({
          izquierda: item.izquierda,
          derecha: pares[index]?.derecha ?? "",
        })),
      }));
    }
  }, [pares, value, preguntaId, setRespuestas]);

  const handleDragEnd = (data: { derecha: string; key: string }[]) => {
    setRightItems(data);
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: leftItems.map((item, idx) => ({
        izquierda: item.izquierda,
        derecha: data[idx]?.derecha ?? "",
      })),
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        {leftItems.map((item, index) => (
          <View
            key={item.key}
            style={[
              styles.card,
              { backgroundColor: colors[index % colors.length] },
            ]}
          >
            <Text style={styles.text}>{item.izquierda}</Text>
          </View>
        ))}
      </View>
      <View style={styles.rightColumn}>
        <DraggableFlatList
          data={rightItems}
          onDragEnd={({ data }) => handleDragEnd(data)}
          keyExtractor={(item) => item.key}
          renderItem={({ item, drag, isActive }) => {
            const index = rightItems.findIndex((i) => i.key === item.key);
            return (
              <ScaleDecorator>
                <View
                  style={[
                    styles.card,
                    {
                      backgroundColor: colors[index % colors.length],
                      opacity: isActive ? 0.7 : 1,
                    },
                  ]}
                  onTouchStart={drag}
                >
                  <Text style={styles.text}>{item.derecha}</Text>
                </View>
              </ScaleDecorator>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Pares;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
  },
  leftColumn: {
    flex: 1,
    marginRight: 8,
  },
  rightColumn: {
    flex: 1,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
