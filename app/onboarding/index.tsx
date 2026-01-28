import Banner from "@/components/Banner";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { withOpacity } from "@/utils/getColorByHex";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "¿Listo para aprender?",
    text: "En Digital College formamos mentes brillantes para un mundo mejor",
    image: require("@/assets/images/vector.png"),
  },
  {
    id: "2",
    title: "La aventura empieza ahora",
    text: "Rompiendo barreras en la educación",
    image: require("@/assets/images/vector.png"),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const skip = () => {
    router.navigate("/(protected)");
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Banner />
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <View
              style={{ width, alignItems: "center", justifyContent: "center" }}
            >
              <Image
                source={item.image}
                style={{ width: 300, height: 300, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 22,
                  color: "#00bcd4",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  marginHorizontal: 40,
                  marginTop: 10,
                }}
              >
                {item.text}
              </Text>
              <View style={carouselStyles.paginationContainer}>
                {Array.from({ length: onboardingData.length }).map(
                  (_, index) => (
                    <Animated.View
                      key={index}
                      style={[
                        carouselStyles.paginationDot,
                        currentIndex === index
                          ? carouselStyles.activeDot
                          : carouselStyles.inactiveDot,
                      ]}
                    />
                  )
                )}
              </View>
            </View>
          </>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          marginBottom: 60,
          justifyContent: "center",
        }}
      >
        {currentIndex == 0 ? (
          <>
            <TouchableOpacity
              style={carouselStyles.btn}
              activeOpacity={0.8}
              onPress={skip}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#fff",
                }}
              >
                Saltar
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              style={[
                carouselStyles.btn,
                {
                  backgroundColor: withOpacity("#F9B233", 0.5),
                  borderColor: "#F9B233",
                  borderWidth: 1,
                  paddingVertical: 12,
                  borderRadius: 25,
                  alignItems: "center",
                },
              ]}
              activeOpacity={0.8}
              onPress={handleNext}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#fff",
                }}
              >
                Siguiente
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[
              carouselStyles.btn,
              {
                backgroundColor: withOpacity("#F9B233", 0.5),
                borderColor: "#F9B233",
                borderWidth: 1,
                paddingVertical: 12,
                borderRadius: 25,
                alignItems: "center",
                marginTop: 20,
                maxWidth: "60%",
                justifyContent: "center",
              },
            ]}
            onPress={() => router.replace("/(protected)")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "#ffff" }}>
              Empecemos
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const skipButton = {
  borderRadius: 100,
  paddingTop: 20, // Padding superior
  paddingRight: 40, // Padding derecho
  paddingBottom: 20, // Padding inferior
  paddingLeft: 40,
};

const carouselStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "black",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
    marginTop: 90,
  },
  image: {
    width: "100%",
    height: height * 0.36,
  },
  paginationContainer: {
    marginVertical: 25,
    position: "absolute",
    bottom: height * 0.278,
    flexDirection: "row",
    alignSelf: "center",
  },
  paginationDot: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: width * 0.015,
    marginHorizontal: width * 0.02,
  },
  activeDot: {
    backgroundColor: Colors.yellowDC,
  },
  inactiveDot: {
    backgroundColor: "#FFFFFF",
  },
  skipButton: {
    ...skipButton,
  },
  skipButtonWhite: {
    ...skipButton,
    backgroundColor: "#FFFFFF",
    color: Colors.background,
  },
  skipText: {
    fontSize: 20,
    textAlign: "center",
  },
  skipTextWhite: {
    color: "#133072",
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    ...styles.text,
    flex: 1,
    textAlign: "center",
  },
  title: {
    paddingTop: 120,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 25,
    color: Colors.greenBlueDC,
    fontWeight: "bold",
    lineHeight: 20,
  },
  skipButtonContainer: {
    position: "absolute",
    bottom: "5%",
    flexDirection: "row", // Los botones estarán en fila
    justifyContent: "center", // Centrado horizontal
    width: "100%", // Aseguramos que ocupe todo el ancho
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
