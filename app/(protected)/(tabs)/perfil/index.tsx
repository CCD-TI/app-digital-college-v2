import BannerPerfil from "@/components/perfil/BannerPerfil";
import { styles } from "@/constants/Styles";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerfilScreen() {
  return (
    <SafeAreaView style={[styles.container, {  }]}>
      <BannerPerfil/>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",marginVertical: 10, marginHorizontal: "auto" }}>
        
      </View>
    </SafeAreaView>
  );
}
