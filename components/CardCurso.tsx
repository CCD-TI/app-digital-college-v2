import { Colores } from "@/store/auth/cursos_types";
import { router } from "expo-router";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Image as SvgImage } from 'react-native-svg';
interface CardCursoProps {
    id: string;
    name: string;
    imageUrl: string;
    colors: Colores;
    grado?: string;
    nivel?: string;
}
export default function CardCurso({ id, name, imageUrl, colors, grado, nivel }: CardCursoProps) {
    const viewBox = "0 0 310 485";
    const { width } = Dimensions.get('window');
    const cardWidth = width * 0.43; // Ajusta el ancho deseado
    const cardHeight = (485 / 310) * cardWidth; // Mantiene el aspect ratio
    const navegateToModulo = (id: string) => {
        router.navigate(`/curso/${id}`);
    };
    return (
        <TouchableOpacity key={id} activeOpacity={0.9} style={[styles.container, { width: cardWidth, height: cardHeight }]}
            onPress={() => navegateToModulo(id)}
        >

            {/* CAPA 1: El Fondo Recortado (SVG) */}
            <Svg width="100%" height="100%" viewBox={viewBox} style={StyleSheet.absoluteFill}>
                <Defs>
                    <ClipPath id="clipForma">
                        <Path d="M287.245 10.4681H21.7785L4.96782 27.2788V128.498L15.6131 147.881V257.084L4.52426 276.113V457.836L20.5809 473.893H289.286L304.943 456.417V277.044L293.5 257.661V149.212L304.588 127.877V27.1458L287.245 10.4681Z" />
                    </ClipPath>
                </Defs>

                {/* Imagen dentro del SVG para que respete el ClipPath */}
                <SvgImage
                    href={{ uri: imageUrl }}
                    width="310"
                    height="485"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#clipForma)"
                    opacity={0.5}
                />

                {/* Borde del marco */}
                <Path
                    d="M287.245 10.4681H21.7785L4.96782 27.2788V128.498L15.6131 147.881V257.084L4.52426 276.113V457.836L20.5809 473.893H289.286L304.943 456.417V277.044L293.5 257.661V149.212L304.588 127.877V27.1458L287.245 10.4681Z"
                    stroke={colors.primary}
                    strokeWidth="2"
                    fill="none"
                />
                <Path fill={colors.primary} d="M101.957 10.0243L108.832 0H198.829L204.152 10.0243H101.957Z" />
                <Path fill={colors.primary} d="M210.644 474.337L203.813 484.405H113.772L108.449 474.337H210.644Z" />
                {/* Detalles decorativos (los paths pequeños del grupo <g>) */}
                <G fill={colors.secondary}>
                    <Path d="M309.734 151.119V156.619L302.415 159.99V154.845L309.734 151.119Z" />
                    <Path d="M309.734 160.478V165.978L302.415 169.349V164.203L309.734 160.478Z" />
                    <Path d="M309.734 169.836V175.337L302.415 178.663V173.518L309.734 169.836Z" />
                    <Path d="M309.734 179.196V184.696L302.415 188.023V182.877L309.734 179.196Z" />
                    <Path d="M309.734 188.555V194.011L302.415 197.382V192.236L309.734 188.555Z" />
                    <Path d="M309.734 197.914V203.37L302.415 206.741V201.595L309.734 197.914Z" />
                    <Path d="M309.734 207.273V212.728L302.415 216.099V210.954L309.734 207.273Z" />
                    <Path d="M309.734 216.587V222.087L302.415 225.458V220.313L309.734 216.587Z" />
                    <Path d="M309.734 225.946V231.446L302.415 234.817V229.672L309.734 225.946Z" />
                    <Path d="M309.734 235.305V240.806L302.415 244.177V239.031L309.734 235.305Z" />
                    <Path d="M309.734 244.664V250.164L302.415 253.535V248.39L309.734 244.664Z" />
                    <Path d="M0 151.119V156.619L7.31864 159.99V154.845L0 151.119Z" />
                    <Path d="M0 160.478V165.978L7.31864 169.349V164.203L0 160.478Z" />
                    <Path d="M0 169.836V175.337L7.31864 178.663V173.518L0 169.836Z" />
                    <Path d="M0 179.196V184.696L7.31864 188.023V182.877L0 179.196Z" />
                    <Path d="M0 188.555V194.011L7.31864 197.382V192.236L0 188.555Z" />
                    <Path d="M0 197.914V203.37L7.31864 206.741V201.595L0 197.914Z" />
                    <Path d="M0 207.273V212.728L7.31864 216.099V210.954L0 207.273Z" />
                    <Path d="M0 216.587V222.087L7.31864 225.458V220.313L0 216.587Z" />
                    <Path d="M0 225.946V231.446L7.31864 234.817V229.672L0 225.946Z" />
                    <Path d="M0 235.305V240.806L7.31864 244.177V239.031L0 235.305Z" />
                    <Path d="M0 244.664V250.164L7.31864 253.535V248.39L0 244.664Z" />
                </G>
            </Svg>

            {/* CAPA 2: Contenido (Textos y Botones) */}
            <View style={styles.overlayContent}>
                <View style={styles.header}>
                    <Text style={styles.cursoNombre}>{name}</Text>
                    <Text style={styles.gradoNivel}>{grado} {nivel}</Text>
                </View>

                {/* Botón Inferior */}
                <View style={styles.footer}>
                    <View style={[styles.btnAccion, { backgroundColor: colors.primary }]}>
                        <Text style={styles.btnText}>ABRIR CURSO</Text>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignSelf: 'center',
    },
    overlayContent: {
        ...StyleSheet.absoluteFillObject,
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
    },
    cursoNombre: {
        fontFamily: 'Orbitron', // La fuente que acabamos de configurar
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    gradoNivel: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        
    },
    btnAccion: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        // ClipPath manual para el botón o usar un PNG de fondo
        borderRadius: 5,
    },
    btnText: {
        fontFamily: 'Orbitron',
        fontSize: 14,
        color: 'black',
    },
    lockedOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
});