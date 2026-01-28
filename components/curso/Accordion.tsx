import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { withOpacity } from "@/utils/getColorByHex";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

export default function Acordion({
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
}: AccordionProps) {
  const styles = StyleSheet.create({
    accordContainer: {
      paddingBottom: 6,
      marginVertical: 7,
    },
    accordHeader: {
      width: width,
      padding: 10,
      borderWidth: 1,
      backgroundColor: withOpacity(backgroundColor, 0.1),
      color: color,
      borderRadius: 10,
      borderColor: borderColor,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    accordHeaderActive: {
      width: width,
      padding: 10,
      borderWidth: 1,
      backgroundColor: "#F9B233",
      color: color,
      borderRadius: 10,
      borderColor: "#F9B233",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    accordTitle: {
      fontSize: 16,
      color: titleColor,
      fontWeight: "bold",
    },
    accordTitleActive: {
      fontSize: 16,
      color: Colors.background,
      fontWeight: "bold",
    },
    accordSubtitle: {
      fontSize: 14,
      color: color,
      marginTop: 2,
    },
    accordSubtitleAcitve: {
      fontSize: 14,
      color: Colors.background,
      marginTop: 2,
    },
  });

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity
        style={expanded ? styles.accordHeaderActive : styles.accordHeader}
        onPress={onPress}
      >
        <View>
          <Text
            style={expanded ? styles.accordTitleActive : styles.accordTitle}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={
                expanded ? styles.accordSubtitleAcitve : styles.accordSubtitle
              }
            >
              {subtitle}
            </Text>
          )}
        </View>

        <IconSymbol
          name={expanded ? "chevron.up" : "chevron.down"}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
      {expanded && (
        <View style={{ paddingVertical: 8, width: "100%" }}>{children}</View>
      )}
    </View>
  );
}
