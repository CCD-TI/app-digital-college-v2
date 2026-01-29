import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/auth/authStore";
import { Image } from "expo-image";
import { Dimensions, View } from "react-native";
import ProfileAvatar from "../ProfileAvatar";

export default function BannerPerfil() {
    const { perfil, economia } = useAuthStore();
    const { width } = Dimensions.get('window');
    return (
        <View style={{marginVertical: 20, marginHorizontal: "auto"}}>
            <Image source={{ uri: perfil?.perfil.productos_usados.banner }} style={{ width: width * 0.9, height: 150, borderWidth: 2, borderColor: economia?.color_rango_bimestral || Colors.yellowDC2 , borderRadius: 20 }} 
            contentFit="cover" />
            <ProfileAvatar avatarUrl={perfil?.perfil.productos_usados.avatar} marcoUrl={perfil?.perfil.productos_usados.marco} size={120} style={{position: "absolute", bottom: -65, left: (width * 0.45) - 65}}/>
        </View>
    )
}