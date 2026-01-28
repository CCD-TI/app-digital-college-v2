import { carouselStyles } from "@/app/onboarding/style";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

interface OnboardingItemProps {
  activeIndex: number;
  title: string;
  text: string;
  image: any;
  dots: number;
  customButtons?: ReactNode;
  nextStep: any;
}

const skip = () => {
  router.navigate("/(protected)");
};

export default function OnboardingItem({
  activeIndex,
  title,
  text,
  image,
  dots,
  nextStep,
}: OnboardingItemProps) {
  return (
    <View style={carouselStyles.slide}>
      <View style={carouselStyles.paginationContainer}>
        {Array.from({ length: dots }).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              carouselStyles.paginationDot,
              activeIndex === index
                ? carouselStyles.activeDot
                : carouselStyles.inactiveDot,
            ]}
          />
        ))}
      </View>
      <Image source={image} style={carouselStyles.image} resizeMode="contain" />
      <Text style={carouselStyles.title}>{title}</Text>
      <Text style={carouselStyles.text}>{text}</Text>
      {activeIndex == 0 ? (
        <View style={{ flexDirection: "row" }}>
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
            style={[carouselStyles.btn, { backgroundColor: "#fff" }]}
            activeOpacity={0.8}
            onPress={nextStep}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Siguiente
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ height: 50, flexDirection: "row" }}>
          <TouchableOpacity
            style={[carouselStyles.btn, { backgroundColor: "#fff" }]}
            onPress={() => router.replace("/(protected)")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Empecemos</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
