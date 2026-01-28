import Banner from "@/components/Banner";
import Logo from "@/components/Logo";
import { styles } from "@/constants/Styles";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function App() {
  useEffect(() => {
    const start = Date.now();

    const init = async () => {
      // Simula carga real (auth, storage, etc)
      await new Promise(res => setTimeout(res, 800));

      const elapsed = Date.now() - start;
      const minTime = 1200;

      setTimeout(() => {
        router.replace("/onboarding");
      }, Math.max(0, minTime - elapsed));
    };

    init();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Banner />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo width={223} height={174} />
        </View>
      </View>
    </>
  );
}
