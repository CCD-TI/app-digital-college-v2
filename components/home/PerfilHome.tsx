import { useAuthStore } from "@/store/auth/authStore";
import { withOpacity } from "@/utils/getColorByHex";
import { StyleSheet, Text, View } from "react-native";
import ProfileAvatar from "../ProfileAvatar";
import ProgressBarExperience from "../ProgressBarExperience";
import CurrencyBadge from "../ui/CurrencyBadge";
import SkeletonLoader from "./PerfilHomeSkeleton";

export default function PerfilHome() {
    const { perfil, economia } = useAuthStore();
    const avatarUrl = perfil?.perfil?.productos_usados.avatar || "";
    const marcoUrl = perfil?.perfil?.productos_usados.marco || "";
    if (!perfil || !economia) {
        return <SkeletonLoader />;
    }
    return (
        <View style={{ ...localStyles.headerContainer, justifyContent: 'space-between', gap: 10 }}>
            <ProfileAvatar avatarUrl={avatarUrl} marcoUrl={marcoUrl} size={60} />
            <View style={{ ...localStyles.headerTextContainer, gap: 10 }}>

                <View style={localStyles.balanceContainer}>
                    <Text style={localStyles.headerText}>{perfil.perfil.datos_usuario.nombres}</Text>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10 }} >
                        <CurrencyBadge icon="coins" amount={economia.coins_balance} color="#EDAF00" />
                        <CurrencyBadge icon="gem" amount={economia.diamonds_balance} color="#53EAFD" />
                    </View>
                </View>
                <ProgressBarExperience economia={economia} progress={60} color="#00C950" />

            </View>
        </View>
    )
}
const localStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    backgroundColor: withOpacity('#FFFFFF', 0.1),
    borderRadius: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1

  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Orbitron-bold'
  },
  headerSubText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  balanceContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});