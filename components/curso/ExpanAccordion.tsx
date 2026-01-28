import React, { PropsWithChildren } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { withOpacity } from "@/utils/getColorByHex";

export type AccordionProps = PropsWithChildren<{
  title: string;
  expanded: boolean;
  onPress: () => void;
  subtitle?: string;
  borderColor?: string;
  backgroundColor?: string;
  color?: string;
  titleColor?: string;
  width?: any;
}>;

export default function ExpanAccordion({
  children,
  title,
  expanded,
  onPress,
  subtitle,
  borderColor = "#05ABDD",
  color = "#fff",
  titleColor = "#F9B233",
  backgroundColor = "#05ABDD",
  width = "100%",
}: AccordionProps): JSX.Element {
  const styles = StyleSheet.create({
    accordContainer: {
      paddingBottom: 6,
      marginVertical: 7,
      backgroundColor: withOpacity(backgroundColor, 0.1),
      color: color,
      borderRadius: 10,
      borderColor: borderColor,
      borderWidth: 1,
      width: width,
    },
    accordHeader: {
      width: width,
      padding: 10,
      paddingBottom: 6,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    accordTitle: {
      fontSize: 16,
      color: titleColor,
      fontWeight: "bold",
    },
    accordSubtitle: {
      fontSize: 14,
      color: color,
      marginTop: 2,
    },
  });

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={onPress}>
        <View style={{ width: "90%" }}>
          <Text style={styles.accordTitle}>{title}</Text>
          {subtitle && <Text style={styles.accordSubtitle}>{subtitle}</Text>}
        </View>

        <IconSymbol
          name={expanded ? "chevron.up" : "chevron.down"}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
      {expanded && <View style={{ paddingVertical: 8 }}>{children}</View>}
    </View>
  );
}
