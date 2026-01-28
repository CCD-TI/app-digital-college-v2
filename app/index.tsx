import Banner from "@/components/Banner";
import Logo from "@/components/Logo";
import { styles } from "@/constants/Styles";
import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function App() {
  const [loaded, error] = useFonts({
    'Orbitron': require('../assets/fonts/Orbitron-Regular.ttf'),
    'Orbitron-bold': require('../assets/fonts/Orbitron-Bold.ttf'),
    'Orbitron-medium': require('../assets/fonts/Orbitron-Medium.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      router.replace("/onboarding");
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
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
