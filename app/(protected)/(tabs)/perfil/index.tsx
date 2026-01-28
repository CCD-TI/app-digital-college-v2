import { styles } from "@/constants/Styles";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerfilScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.text}>Pantalla de Perfil</Text>
      </View>
    </SafeAreaView>
  );
}
