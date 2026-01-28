import { EconomiaUsuario } from "@/store/auth/perfil_types";
import { StyleSheet, Text, View } from "react-native";


export default function ProgressBarExperience({ economia, progress, color }: { economia: EconomiaUsuario, progress: number; color: string }) {
    const siguienteNivelXp = (economia.nivel_id) * 5000;
    const currentProgress = economia.total_xp / siguienteNivelXp * 100;
    return (
        <View>
            <Text style={styles.texttitle}>
                {economia.total_xp} / {siguienteNivelXp} XP
            </Text>
            <View style={{ height: 10, width: '100%', backgroundColor: '#000000', borderRadius: 5 }}>
                <View style={{ height: '100%', width: `${currentProgress}%`, backgroundColor: color, borderRadius: 5 }} />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    texttitle: { color: "#fff", fontSize: 12, fontWeight: "bold", textAlign: "right", fontFamily: 'Orbitron', marginBottom: 4 }
})