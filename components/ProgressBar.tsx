import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet, Text, ViewStyle } from "react-native";

interface ProgressBarProps {
  progress: number; // valor entre 0 y 1
  height?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  style?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 25,
  color = "#3b82f6",
  backgroundColor = Colors.background,
  style,
}) => {
  const percentage = Math.min(Math.max(progress, 0), 100);
  return (
    <View style={[style]}>
      <View style={[styles.container, { height, backgroundColor }]}>
        <View
          style={[
            styles.filled,
            { width: `${Math.round(percentage)}%`, backgroundColor: color },
          ]}
        />

        <Text style={styles.percentage}>{`${Math.round(percentage)}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  filled: {
    height: "100%",
  },
  percentage: {
    position: "absolute",
    top: 4,
    left: 20,
    color: "#ffff",
    fontWeight: "bold",
  },
});

export default ProgressBar;
