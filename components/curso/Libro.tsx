import ProgressBar from "@/components/ProgressBar";
import { withOpacity } from "@/utils/getColorByHex";
import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { WebView } from "react-native-webview";

const Libro = ({
  flipbookUrl,
  page,
}: {
  flipbookUrl: string;
  page: number;
}) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#ffff" }}>¡Tu progreso va en ascenso!</Text>
      <Text style={{ color: "#ffff", marginBottom: 10 }}>
        Estas en la página {page} de 76
      </Text>
      <ProgressBar
        progress={(page / 76) * 100}
        color="#05ABDD"
        style={{ marginVertical: 10 }}
      />
      <WebView
        source={{ uri: flipbookUrl.replace(".html", "") + `#page/${page}` }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: "100%",
    height: 600,
  },
});

export default Libro;
