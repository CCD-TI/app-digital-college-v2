import { Colors } from "@/constants/Colors";
import { useUser } from "@/contexts/UserContext";
import { useAuthStore } from "@/store/auth/authStore";
import { withOpacity } from "@/utils/getColorByHex";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../Logo";

const { width } = Dimensions.get("window");

const style = StyleSheet.create({
  inputContainer: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: "#ffff",
    backgroundColor: withOpacity("#fff", 0.3),
  },
});

export function LoginForm() {
  const { status, error, login } = useAuthStore();
  const { userData, setUserData } = useUser();
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const handleLogin = () => {
    if (userData.email != "" && password != "") {
      setUserData((prev) => ({
        ...prev,
        invalidInput: false,
      }));
      login({ email: userData.email, password });
    }
    if (!userData.email || !password) {
      setUserData((prev) => ({
        ...prev,
        invalidInput: true,
      }));
    }
  };

  return (
    <View>
      <View style={{ alignItems: "center", marginVertical: 70 }}>
        <Logo width={223} height={174} />
      </View>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor={"#ffff"}
        value={userData.email}
        onChangeText={(text) =>
          setUserData((prev) => ({ ...prev, email: text }))
        }
        style={style.inputContainer}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor={"#ffff"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!passwordVisible}
        style={style.inputContainer}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Checkbox
          value={toggleCheckBox}
          onValueChange={setToggleCheckBox}
          color={toggleCheckBox ? Colors.yellowDC : "#ffff"}
        />
        <View style={{ marginHorizontal: 10 }} />
        <Text style={{ color: "#ffff" }}>Recuerda mi sesión</Text>
      </View>

      {/* Mostrar error si login falla */}
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}
      {userData.invalidInput && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {userData.invalidInputMessage}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#EE9321",
          paddingVertical: 12,
          borderRadius: 25,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text  style={{ color: "black", fontSize: 16, fontFamily: "Orbitron-Bold" }}>
          {status === "loading" ? "Cargando..." : "Iniciar sesión"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
