import { useMemo, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "@/constants/Colors";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { useUser } from "@/contexts/UserContext";

export const ForgotPassword = () => {
  const { bottomSheetRef } = useBottomSheet();
  const snapPoints = useMemo(() => ["35%"], []);

  const { userData } = useUser();

  const { error, successMessage, requestPasswordReset, loading } =
    useForgotPassword();

  const handlePress = async () => {
    if (!userData.email) return;
    await requestPasswordReset(userData.email);
  };

  return (
    <BottomSheet
      style={{
        shadowColor: "rgba(49, 131, 245, 0.2)",
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
      }}
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      handleComponent={() => (
        <View
          style={{
            height: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.background,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <View
            style={{
              width: 60,
              height: 6,
              borderRadius: 3,
              backgroundColor: Colors.background,
            }}
          />
        </View>
      )}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetView
        style={{
          flex: 1,
          padding: 36,
          alignItems: "center",
          backgroundColor: Colors.background,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          ¡Oops, perdiste tu acceso! 🔑{" "}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            marginVertical: 10,
            textAlign: "center",
            maxWidth: "90%",
          }}
        >
          Te ayudamos a recuperarlo en un par de clics. Vamos a ayudarte a
          volver a la partida.
        </Text>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            backgroundColor: Colors.yellowDC,
            paddingVertical: 12,
            borderRadius: 25,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: Colors.background,
              fontSize: 16,
              fontWeight: "bold",
              padding: 5,
            }}
          >
            {loading ? "Procesando..." : "Te enviaremos un correo"}
          </Text>
        </TouchableOpacity>
        {successMessage && (
          <Text style={{ marginTop: 10, color: "green" }}>
            {successMessage}
          </Text>
        )}

        {error && <Text style={{ marginTop: 10, color: "red" }}>{error}</Text>}
      </BottomSheetView>
    </BottomSheet>
  );
};
