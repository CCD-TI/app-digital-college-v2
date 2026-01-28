import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "@/store/auth/authStore";
import { BottomSheetProvider } from "@/contexts/BottomSheetContext";
import { useEffect } from "react";

export default function ProtectedLayout() {
  const { token, fetchPerfilUsuario, fetchEconomiaUsuario } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchPerfilUsuario();
      fetchEconomiaUsuario();
    }
  }, [token]);

  if (!token) return <Redirect href="/login" />;

  return (
    <BottomSheetProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </BottomSheetProvider>
  );
}
