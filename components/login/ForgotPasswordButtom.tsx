import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useUser } from "@/contexts/UserContext";
import { useBottomSheet } from "@/contexts/BottomSheetContext";

export const ForgotPasswordButtom = () => {
  const { userData, setUserData } = useUser();
  const { bottomSheetRef } = useBottomSheet();

  const abrirBottomSheet = () => {
    setUserData((prev) => ({
      ...prev,
      invalidInput: true,
      invalidInputMessage: "Por favor, ingrese su correo",
    }));

    if (userData.email != "") {
      bottomSheetRef.current?.expand();
    }
  };
  return (
    <TouchableOpacity onPress={abrirBottomSheet} style={{ marginBottom: 80 }}>
      <Text
        style={{
          textAlign: "center",
          color: "#ffff",
          marginTop: 100,
        }}
      >
        ¿Olvidaste tu contraseña?
      </Text>
    </TouchableOpacity>
  );
};
