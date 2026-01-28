import { useAuthStore } from "@/store/auth/authStore";
import { useEffect } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Banner from "@/components/Banner";
import { styles } from "@/constants/Styles";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ForgotPassword } from "@/components/login/ForgotPassword";
import { ForgotPasswordButtom } from "@/components/login/ForgotPasswordButtom";
import { LoginForm } from "@/components/login/LoginForm";

const { width } = Dimensions.get("window");

export default function Login() {
  const { status } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [status]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Banner />
          <SafeAreaView style={styles.safeArea}></SafeAreaView>
          <View style={{ padding: width * 0.05 }}>
            <LoginForm />
            <ForgotPasswordButtom />
          </View>
        </KeyboardAvoidingView>
        <ForgotPassword />
      </View>
    </GestureHandlerRootView>
  );
}
